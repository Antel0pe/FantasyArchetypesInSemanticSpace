'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, Label, CartesianGrid, ReferenceLine } from 'recharts';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArchetypeNode } from '@/lib/data';
import { AvailableGraphVisualizationOptions, getAvailableGraphTypes, getDataForGraphType, GraphConfig, GraphType, VisualizationCategory, VisualizationNames } from '@/lib/availableVisualizationOptions';
import ArchetypeViewer from './archetype-viewer';
import HeatmapGraphViewer from './HeatmapGraphViewer';

type Props = {
    selectedArchetype: ArchetypeNode | null
    setSelectedArchetype: Dispatch<ArchetypeNode>
    visualizationCategory: VisualizationCategory
    graphType: GraphType
}


const BaseGraphViewer = ({ selectedArchetype, setSelectedArchetype, visualizationCategory, graphType }: Props) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const GraphComponent = ({ category, selectedType }: { 
        category: VisualizationCategory, 
        selectedType: AvailableGraphVisualizationOptions 
    }) => {
        switch (selectedType) {
            case AvailableGraphVisualizationOptions.Scatter:
                return <ArchetypeViewer nodeData={getDataForGraphType(category, selectedType)} selectedArchetype={selectedArchetype} setSelectedArchetype={setSelectedArchetype} graphConfig={graphType.config} />;
            case AvailableGraphVisualizationOptions.Heatmap:
                return <HeatmapGraphViewer nodeData={getDataForGraphType(category, selectedType)} selectedArchetype={selectedArchetype} setSelectedArchetype={setSelectedArchetype} graphConfig={graphType.config} />;
            case AvailableGraphVisualizationOptions.TwoDimensionalPlot:
                return <ArchetypeViewer nodeData={getDataForGraphType(category, selectedType)} selectedArchetype={selectedArchetype} setSelectedArchetype={setSelectedArchetype} graphConfig={graphType.config}/>;
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
                        <GraphComponent category={visualizationCategory} selectedType={graphType.type} />
                )}
            </Card>

        </div >

    );
};

export default BaseGraphViewer;