"use client"

import { useCallback, useEffect, useState } from 'react'
import { Menu, Twitter } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import GraphCardInformation from '@/components/GraphCardInformation'
import { ArchetypeNode, AvailableGraphVisualizationOptions, availableVisualizations, getAvailableGraphTypes, getDataForGraphType, getGraphType, GraphConfig } from '@/lib/availableVisualizationOptions'
import GraphViewOptions from '@/components/GraphViewOptions'
import BaseGraphViewer from '@/components/BaseGraphViewer'
import AxisGeneratorModal from '@/components/AxisGeneratorModal'
import { completeAnalysis } from '@/lib/axisGeneration/api'
import DataGeneratorModal from '@/components/DataGeneratorModal'
import { EmbeddingsResponse } from './api/generate-embeddings/route'



export default function VisualizationSwitcher() {
    const [activeViz, setActiveViz] = useState(availableVisualizations[0])
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [selectedArchetype, setSelectedArchetype] = useState<ArchetypeNode | null>(null);
    const [visualizationType, setVisualizationType] = useState<AvailableGraphVisualizationOptions>(AvailableGraphVisualizationOptions.TwoDimensionalPlot);
    const [displayData, setDisplayData] = useState<ArchetypeNode[]>(getDataForGraphType(activeViz, visualizationType))
    const [graphConfig, setGraphConfig] = useState<GraphConfig | null>(getGraphType(activeViz, visualizationType).config ?? null);

    useEffect(() => {
        console.log('updating display data from useeffect')
        setDisplayData(getDataForGraphType(activeViz, visualizationType));
    }, [activeViz, visualizationType])

    useEffect(() => {
        // only update config if no config existed before
        // currently with fantasyArchetype data only changes from scatter to 2d/heatmap
        if (!graphConfig) {
            console.log('updating graph config')
            console.log('prev ' + JSON.stringify(graphConfig))
            setGraphConfig(getGraphType(activeViz, visualizationType).config ?? null);
        }
    }, [activeViz, visualizationType, graphConfig])

    const handleVizChange = (newViz: typeof activeViz) => {
        setActiveViz(newViz);
        // Reset to the first supported graph type of wthe new visualization
        setVisualizationType(newViz.supportedGraphTypes[0].type);
        // Optionally clear the selected archetype when switching visualizations
        setSelectedArchetype(null);
        if (window.innerWidth < 1024) setSidebarOpen(false);
    };

    const onNewAxisGeneratedWithDisplayData = useCallback(async (nodes: ArchetypeNode[], left: string[], right: string[], axis: 'x' | 'y') => {
        if (!graphConfig) {
            console.error('No graph config!');
            return nodes;
        }

        console.log('in axis generator, using display data')
        console.log(nodes)

        const nodesWithEmbeddings = nodes
            .filter((d) => d.originalEmbedding !== undefined);

        const originalEmbeddingData = nodesWithEmbeddings.map((d) => d.originalEmbedding as number[]);

        let newEmbeds;
        try {
            newEmbeds = await completeAnalysis({
                left_terms: left,
                right_terms: right
            }, { embeddings: originalEmbeddingData });
        } catch (error) {
            console.error('Analysis failed:', error);
            return nodes; // Return original nodes on error
        }

        console.log(newEmbeds);

        const updatedNodes = nodes.map(node => {
            const nodeIndex = nodesWithEmbeddings.findIndex(n => n.id === node.id);
            if (nodeIndex === -1) return node;  // Keep unchanged if no embedding

            return {
                ...node,
                [axis]: newEmbeds.coordinates[nodeIndex]
            };
        });

        if (graphConfig) {
            setGraphConfig((prevConfig) => {
                if (!prevConfig) return null;  // TypeScript guard
                return {
                    x: prevConfig.x,  // Keep existing x values
                    y: prevConfig.y,  // Keep existing y values
                    [axis]: {
                        negative: left[0],
                        positive: right[0],
                        negativeTerms: left, 
                        positiveTerms: right,
                    }
                };
            });
        }

        return updatedNodes;

    }, [graphConfig])

    const onNewAxisGenerated = useCallback(async (left: string[], right: string[], axis: 'x' | 'y') => {
        if (!graphConfig) {
            console.error('No graph config!');
        }

        console.log('in axis generator, using display data')
        console.log(displayData)

        const nodesWithEmbeddings = displayData
            .filter((d) => d.originalEmbedding !== undefined);

        const originalEmbeddingData = nodesWithEmbeddings.map((d) => d.originalEmbedding as number[]);

        const newEmbeds = await completeAnalysis({
            left_terms: left,
            right_terms: right
        }, { embeddings: originalEmbeddingData });

        console.log(newEmbeds);

        setDisplayData(prevData => prevData.map(node => {
            const nodeIndex = nodesWithEmbeddings.findIndex(n => n.id === node.id);
            if (nodeIndex === -1) return node;  // Keep unchanged if no embedding

            return {
                ...node,
                [axis]: newEmbeds.coordinates[nodeIndex]
            };
        }));

        if (graphConfig) {
            setGraphConfig((prevConfig) => {
                if (!prevConfig) return null;  // TypeScript guard
                return {
                    x: prevConfig.x,  // Keep existing x values
                    y: prevConfig.y,  // Keep existing y values
                    [axis]: {
                        negative: left[0],
                        positive: right[0],
                        negativeTerms: left, 
                        positiveTerms: right,
                    }
                };
            });
        }

    }, [graphConfig, displayData])

    const onNewDataPointsGenerated = useCallback(async (embeddingResponse: EmbeddingsResponse) => {
        const newArchetypeNodes: ArchetypeNode[] = Object.entries(embeddingResponse.embeddings).map(([name, embedding], idx) => ({
            id: idx.toString(), // Generate unique ID for each node
            name: name,
            description: name, // Using name as description, can be modified if needed
            tags: [], // Empty tags array, can be populated if needed
            color: '#FF5733',
            x: 0, // Initial position, will be updated based on embedding
            y: 0,
            originalEmbedding: embedding
        }));

        if (graphConfig) {
            console.log('Regenerating axis coordinates')
            // Sequential axis calculations
            let nodes = await onNewAxisGeneratedWithDisplayData(newArchetypeNodes, graphConfig.x.negativeTerms, graphConfig.x.positiveTerms, 'x');
            nodes = await onNewAxisGeneratedWithDisplayData(nodes, graphConfig.y.negativeTerms, graphConfig.y.positiveTerms, 'y');
            console.log('updated nodes = ')
            console.log(nodes)
            setDisplayData(nodes);
        }
    }, [graphConfig, onNewAxisGeneratedWithDisplayData])

    return (
        <div className="relative h-screen bg-background overflow-hidden">
            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-10 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-20 w-64 h-full border-r bg-background shadow-lg transition-transform duration-300 ease-in-out",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <ScrollArea className="h-full">
                    <div className="space-y-4 py-4">
                        <div className="px-3 py-2">
                            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                Visualizations
                            </h2>
                            <div className="space-y-1">
                                {availableVisualizations.map((viz) => (
                                    <Button
                                        key={viz.name}
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-start transition-colors",
                                            activeViz.name === viz.name
                                                ? "bg-accent text-accent-foreground"
                                                : "hover:bg-accent/50 hover:text-accent-foreground"
                                        )}
                                        onClick={() => {
                                            handleVizChange(viz)
                                        }}
                                    >
                                        <viz.icon className="mr-2 h-4 w-4" />
                                        {viz.name}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </aside>

            <div className="absolute top-4 right-4 flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-800 text-white hover:bg-gray-700"
                    asChild
                >
                    <a
                        href="https://x.com/JungleSilicon/status/1865604152329388298"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Original Inspiration
                    </a>
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-800 text-white hover:bg-gray-700"
                    asChild
                >
                    <a
                        href="https://x.com/JungleSilicon"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Twitter className="w-4 h-4 mr-2" />
                        Original Creator
                    </a>
                </Button>
            </div>

            {/* Main content area */}
            <main className={cn(
                "h-full transition-all duration-300 ease-in-out",
                sidebarOpen ? "lg:ml-64" : "ml-0"
            )}>
                <div className="flex items-center p-4 border-b">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="mr-4 hover:bg-accent hover:text-accent-foreground"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                    >
                        <Menu className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl font-bold">{activeViz.name}</h1>
                </div>
                <div className="p-6 h-[calc(100vh-5rem)] overflow-auto">
                    <div className="h-full w-full">
                        <div className="min-h-screen bg-black text-white p-6 relative" >
                            <div className="grid md:grid-cols-2 gap-8  mx-auto">
                                {/* <ArchetypeViewer nodeData={getDataForGraphType(activeViz, visualizationType)} selectedArchetype={selectedArchetype} setSelectedArchetype={setSelectedArchetype} /> */}
                                <BaseGraphViewer displayData={displayData} selectedArchetype={selectedArchetype} setSelectedArchetype={setSelectedArchetype} visualizationCategory={activeViz} graphType={getGraphType(activeViz, visualizationType)} graphConfig={graphConfig} />

                                <GraphCardInformation selectedArchetype={selectedArchetype} />

                                <GraphViewOptions availableVisualizationOptions={getAvailableGraphTypes(activeViz)} visualizationType={visualizationType} setVisualizationType={setVisualizationType} />

                                {visualizationType === AvailableGraphVisualizationOptions.TwoDimensionalPlot && (
                                    <div>
                                        <AxisGeneratorModal axis={'x'} onGenerated={onNewAxisGenerated} onClose={() => null} />
                                        <AxisGeneratorModal axis={'y'} onGenerated={onNewAxisGenerated} onClose={() => null} />
                                        <DataGeneratorModal onGeneration={onNewDataPointsGenerated} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
