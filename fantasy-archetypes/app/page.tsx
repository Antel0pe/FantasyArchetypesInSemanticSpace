"use client"

import { useCallback, useEffect, useState } from 'react'
import { Menu, Twitter, Microscope, Wand } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import ArchetypeViewer from '@/components/archetype-viewer'
import GraphCardInformation from '@/components/GraphCardInformation'
import { ArchetypeNode, AvailableGraphVisualizationOptions, availableVisualizations, DisplayNode, getAvailableGraphTypes, getDataForGraphType, getGraphType, GraphConfig } from '@/lib/availableVisualizationOptions'
import GraphViewOptions from '@/components/GraphViewOptions'
import BaseGraphViewer from '@/components/BaseGraphViewer'
import AxisGeneratorModal from '@/components/AxisGeneratorModal'
import { completeAnalysis, createAxis, EmbeddingInput } from '@/lib/axisGeneration/api'



export default function VisualizationSwitcher() {
    const [activeViz, setActiveViz] = useState(availableVisualizations[0])
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [selectedArchetype, setSelectedArchetype] = useState<ArchetypeNode | null>(null);
    const [visualizationType, setVisualizationType] = useState<AvailableGraphVisualizationOptions>(AvailableGraphVisualizationOptions.Scatter);
    const [displayData, setDisplayData] = useState<DisplayNode[]>([])
    const [graphConfig, setGraphConfig] = useState<GraphConfig | null>(null);

    useEffect(() => {
        setDisplayData(getDataForGraphType(activeViz, visualizationType)
            .map(({ id, name, description, tags, color, x, y }) =>
                ({ id, name, description, tags, color, x, y })));

        // only update config if no config existed before
        // currently with fantasyArchetype data only changes from scatter to 2d/heatmap
        if (!graphConfig) {
            console.log('updating graph config')
            console.log('prev ' + JSON.stringify(graphConfig))
            setGraphConfig(getGraphType(activeViz, visualizationType).config ?? null);            
        }
    }, [activeViz, visualizationType]) 

    const handleVizChange = (newViz: typeof activeViz) => {
        setActiveViz(newViz);
        // Reset to the first supported graph type of wthe new visualization
        setVisualizationType(newViz.supportedGraphTypes[0].type);
        // Optionally clear the selected archetype when switching visualizations
        setSelectedArchetype(null);
        if (window.innerWidth < 1024) setSidebarOpen(false);
    };

    const onNewAxisGenerated = useCallback(async (left: string[], right: string[], axis: 'x' | 'y') => {
        const nodesWithEmbeddings = getDataForGraphType(activeViz, visualizationType)
            .filter((d) => d.originalEmbedding !== undefined);

        let originalEmbeddingData = nodesWithEmbeddings.map((d) => d.originalEmbedding as number[]);

        let newEmbeds = await completeAnalysis({
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
                        positive: right[0]
                    }
                };
            });
        }

    }, [activeViz, visualizationType, graphConfig])

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
