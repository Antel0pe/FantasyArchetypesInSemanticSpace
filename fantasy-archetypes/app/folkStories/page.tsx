'use client'
import React, { useState, useEffect } from 'react';
import ScatterPlotWithTooltip, { PointData } from '@/components/scatterplot-with-axis-change';
import { DataPoint, getAxisInterpretation } from '@/lib/api';

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
    const projectStories = (transformedData: number[][], stories: FolkStory[]): PointData[] => {
        return stories.map((story, i) => ({
            x: transformedData[i][0],  // First component
            y: transformedData[i][1],  // Second component
            name: story.title,
            category: story.genre
        }));
    };

    const getAxisLabels = async (points: PointData[], stories: FolkStory[]) => {
        let data: DataPoint[] = [];

        for (let i = 0; i < stories.length; i++){
            data.push({
                x: points[i].x.toFixed(3),
                text: `Title: ${stories[i].title}  Genre: ${stories[i].genre} From: ${stories[i].source} in ${stories[i].region}`
            })
        }

        data.sort((a, b) => parseFloat(a.x) - parseFloat(b.x))
        console.log(data)
        let res = await getAxisInterpretation(data);
        console.log(res);
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

                // Project stories onto PCA components
                const points = projectStories(pcaResult.transformed_data, loadedStories);
                setProcessedPoints(points);

                getAxisLabels(points, loadedStories)

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
                <ScatterPlotWithTooltip data={processedPoints} />
            ) : (
                <p className="text-center text-gray-600">No stories found</p>
            )}
        </div>
    );
}