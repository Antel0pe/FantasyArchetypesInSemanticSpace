'use client';

import React, { Dispatch, useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { ArchetypeNode, AvailableGraphVisualizationOptions, GraphConfig, GraphType, VisualizationCategory } from '@/lib/availableVisualizationOptions';
import dynamic from 'next/dynamic';

type Props = {
    displayData: ArchetypeNode[]
    selectedArchetype: ArchetypeNode | null
    setSelectedArchetype: Dispatch<ArchetypeNode>
    visualizationCategory: VisualizationCategory
    graphType: GraphType
    graphConfig: GraphConfig | null
}

// Dynamically import the visualization components with SSR disabled
const ArchetypeViewer = dynamic(() => import('./archetype-viewer'), { ssr: false });
const HeatmapGraphViewer = dynamic(() => import('./HeatmapGraphViewer'), { ssr: false });

const BaseGraphViewer = ({ displayData, selectedArchetype, setSelectedArchetype, graphType, graphConfig }: Props) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const GraphComponent = ({selectedType }: { 
        selectedType: AvailableGraphVisualizationOptions 
    }) => {
        switch (selectedType) {
            case AvailableGraphVisualizationOptions.Scatter:
                return <ArchetypeViewer nodeData={displayData} selectedArchetype={selectedArchetype} setSelectedArchetype={setSelectedArchetype} graphConfig={graphConfig} />;
            case AvailableGraphVisualizationOptions.Heatmap:
                return <HeatmapGraphViewer nodeData={displayData} selectedArchetype={selectedArchetype} setSelectedArchetype={setSelectedArchetype} graphConfig={graphConfig} />;
            case AvailableGraphVisualizationOptions.TwoDimensionalPlot:
                return <ArchetypeViewer nodeData={displayData} selectedArchetype={selectedArchetype} setSelectedArchetype={setSelectedArchetype} graphConfig={graphConfig}/>;
            default:
                return <div>Unsupported graph type</div>;
        }

    };


    return (
        <div className="" >
            <Card id={'1'} className="bg-gray-900 border-0 p-4 relative flex items-center justify-center">
                {!isMounted ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="w-full h-full bg-gray-800/50" />
                    </div>
                ) : (
                        <GraphComponent selectedType={graphType.type} />
                )}
            </Card>

        </div >

    );
};

export default BaseGraphViewer;