'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, Label, CartesianGrid, ReferenceLine } from 'recharts';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArchetypeNode, DisplayNode, GraphConfig } from '@/lib/availableVisualizationOptions';

type Props = {
    nodeData: ArchetypeNode[]
    selectedArchetype: ArchetypeNode | null
    setSelectedArchetype: Dispatch<ArchetypeNode>
    graphConfig: GraphConfig | null
}

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-gray-800 p-2 rounded shadow-lg border border-gray-700">
                <p className="text-white">{data.name}</p>
            </div>
        );
    }
    return null;
};

const ArchetypeViewer = ({ nodeData = [], selectedArchetype, setSelectedArchetype, graphConfig }: Props) => {
    const [hoveredArchetype, setHoveredArchetype] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);


    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Transform the data for Recharts
    const chartData = nodeData.map(node => ({
        z: 200,
        ...node
    }));

    return (
        < div className="space-y-4" >
            <Card id={'1'} className="bg-gray-900 border-0 p-4 relative flex items-center justify-center" style={{ width: '440px', height: '440px' }}>
                {!isMounted ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="w-full h-full bg-gray-800/50" />
                    </div>
                ) : (
                    <ScatterChart
                        width={440}
                        height={400}
                        margin={{
                            top: 20,
                            right: 50,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            type="number"
                            dataKey="x"
                            name="X"
                            tick={{ fill: '#9CA3AF' }}
                            axisLine={{ stroke: '#4B5563' }}
                        />

                        <YAxis
                            type="number"
                            dataKey="y"
                            name="Y"
                            tick={{ fill: '#9CA3AF' }}
                            axisLine={{ stroke: '#4B5563' }}
                        />
                        {graphConfig && (
                            <>
                                <ReferenceLine
                                    y={0}
                                    stroke="#FFFF00"
                                >
                                    <Label value={graphConfig.x.negative} offset={30} position="left" />
                                    <Label value={graphConfig.x.positive} offset={10} position="right" />
                                </ReferenceLine>
                                <ReferenceLine
                                    x={0}
                                    stroke="#FFFF00"
                                    label='y'
                                >
                                    <Label value={graphConfig.y.negative} offset={30} position="bottom" />
                                    <Label value={graphConfig.y.positive} offset={15} position="top" />
                                </ReferenceLine>
                            </>
                        )}

                        <ZAxis type="number" dataKey="z" range={[100, 200]} />
                        <Tooltip content={<CustomTooltip />} />
                        <Scatter
                            data={chartData}
                            onMouseEnter={(data) => setHoveredArchetype(data.id)}
                            onMouseLeave={() => setHoveredArchetype(null)}
                            onClick={(data) => setSelectedArchetype(data)}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                    cursor="pointer"
                                    opacity={
                                        hoveredArchetype === entry.id ? 1 :
                                            selectedArchetype?.id === entry.id ? 1 : 0.8
                                    }
                                    stroke="white"
                                    strokeWidth={1}
                                />
                            ))}
                        </Scatter>
                    </ScatterChart>
                )}
            </Card>

        </div >

    );
};

export default ArchetypeViewer;