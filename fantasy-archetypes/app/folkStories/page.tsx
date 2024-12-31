'use client'
import React, { useState, useEffect, useMemo } from 'react';
import ScatterPlotWithTooltip, { PointData } from '@/components/scatterplot-with-axis-change';
import { AxisInterpretation, DataPoint, getAxisInterpretation } from '@/lib/api';

// Types for our data
export interface FolkStory {
    genre: string;
    source: string;
    region: string;
    title: string;
    full_text: string;
    tokenCount: number;
    embedding: number[];
}

interface PCAComponent {
    component: number[];
    explained_variance_ratio: number;
}

interface PCAResponse {
    components: PCAComponent[];
    total_explained_variance: number;
    transformed_data: number[][];
}


export default function Page() {
    const [stories, setStories] = useState<FolkStory[]>([]);
    const [pcaComponents, setPcaComponents] = useState<PCAComponent[]>([]);
    const [totalVariance, setTotalVariance] = useState<number>(0);
    const [processedPoints, setProcessedPoints] = useState<PointData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [xLabel, setXLabel] = useState<AxisInterpretation>({ positive: 'X', negative: 'X', oneWordDescription: 'X' })
    const [yLabel, setYLabel] = useState<AxisInterpretation>({ positive: 'Y', negative: 'Y', oneWordDescription: 'Y' })
    const [pcaLabels, setPCALabels] = useState<AxisInterpretation[]>([]);
    const [pcaData, setPCAData] = useState<number[][]>([]);
    const [xPCAComponentIdx, setXPcaComponentIdx] = useState(0);
    const [yPCAComponentIdx, setYPcaComponentIdx] = useState(1);

    // Function to compute PCA
    const computePCA = async (embeddings: number[][]): Promise<PCAResponse> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_PYTHON_BACKEND_URL}/pca`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    embeddings,
                    random_state: 42
                }),
            });

            if (!response.ok) {
                throw new Error(`PCA computation failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            throw new Error(`Failed to compute PCA: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    // Function to project stories onto PCA components
    const projectStories = (transformedData: number[][], stories: FolkStory[], comp1: number, comp2: number): PointData[] => {
        console.log('project stories: ')
        console.log('dims ' + transformedData.length + ', ' + transformedData[0].length)
        console.log('components: ' + comp1 + ' ' + comp2)
        return stories.map((story, i) => ({
            x: transformedData[i][comp1],  // First component
            y: transformedData[i][comp2],  // Second component
            story: story
        }));
    };

    const getAxisLabels = async (points: PointData[], stories: FolkStory[]) => {
        let resX = await getAxisInterpretation(createDataRequest(points, stories, 'x'));
        setXLabel(resX)
        console.log(resX)

        let resY = await getAxisInterpretation(createDataRequest(points, stories, 'y'));
        setYLabel(resY)
        console.log(resY)
    }

    const getAllPCALabels = async (data: number[][], stories: FolkStory[], dimensions: number) => {
        console.log('number of dimensions: ' + dimensions)
        console.log('data ' + JSON.stringify(data))
        let pcaLabels = []
        for (let i = 0; i < dimensions; i++) {
            let points = projectStories(data, stories, i, i);
            console.log('points ' + JSON.stringify(points))
            let result = await getAxisInterpretation(createDataRequest(points, stories, 'x'));
            pcaLabels.push(result)
            console.log(result)
        }

        setPCALabels(pcaLabels)
        console.log('all pca labels parsed')
        console.log(pcaLabels)
    }

    const switchPCAAxis = useMemo(() => {
        return (axis: 'x' | 'y', compNum: number) => {
            const pcaComp = pcaLabels[compNum];
            if (axis === 'x') {
                setXPcaComponentIdx(compNum)
                setXLabel(pcaComp);

                const points = projectStories(pcaData, stories, compNum, yPCAComponentIdx);
                setProcessedPoints(points);
            } else {
                setYPcaComponentIdx(compNum)
                setYLabel(pcaComp);

                const points = projectStories(pcaData, stories, xPCAComponentIdx, compNum);
                setProcessedPoints(points);
            }
        };
    }, [pcaLabels]);

    const createDataRequest = (points: PointData[], stories: FolkStory[], coordinate: 'x' | 'y') => {
        let data: DataPoint[] = [];

        for (let i = 0; i < stories.length; i++) {
            data.push({
                x: points[i][coordinate].toFixed(3),
                text: `Title: ${stories[i].title}  Genre: ${stories[i].genre} From: ${stories[i].source} in ${stories[i].region}`
            })
        }

        return data.toSorted((a, b) => parseFloat(a.x) - parseFloat(b.x))
    }

    useEffect(() => {
        const loadStoriesAndComputePCA = async () => {
            try {
                setIsLoading(true);

                // Load stories
                const response = await fetch('data/folkStoryEmbeddings.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const loadedStories = await response.json();
                setStories(loadedStories);

                // Extract embeddings and compute PCA
                const embeddings = loadedStories.map((story: FolkStory) => story.embedding);
                const pcaResult = await computePCA(embeddings);

                setPcaComponents(pcaResult.components);
                setTotalVariance(pcaResult.total_explained_variance);
                setPCAData(pcaResult.transformed_data)

                // Project stories onto PCA components
                const points = projectStories(pcaResult.transformed_data, loadedStories, xPCAComponentIdx, yPCAComponentIdx);
                setProcessedPoints(points);

                getAxisLabels(points, loadedStories)

                getAllPCALabels(pcaResult.transformed_data, loadedStories, pcaResult.components.length);

            } catch (e) {
                setError(e instanceof Error ? e.message : 'Failed to load stories and compute PCA');
            } finally {
                setIsLoading(false);
            }
        };

        loadStoriesAndComputePCA();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4  mx-auto"></div>
                    <p className="text-gray-600">Loading stories and computing PCA...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center text-red-600">
                    <p className="text-lg font-semibold">Error</p>
                    <p className="text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4">
            {processedPoints.length > 0 ? (
                <ScatterPlotWithTooltip data={processedPoints} xLabel={xLabel} yLabel={yLabel} allLabels={pcaLabels} switchAxis={switchPCAAxis} />
            ) : (
                <p className="text-center text-gray-600">No stories found</p>
            )}
        </div>
    );
}