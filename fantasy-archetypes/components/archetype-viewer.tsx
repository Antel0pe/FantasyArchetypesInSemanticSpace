'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from 'recharts';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArchetypeNode } from '@/lib/data';

type Props = {
    nodeData: ArchetypeNode[]
    selectedArchetype: ArchetypeNode | null
    setSelectedArchetype: Dispatch<ArchetypeNode | null>
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

const ArchetypeViewer = ({ nodeData = [], selectedArchetype, setSelectedArchetype }: Props) => {
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
            <Card id={'1'} className="bg-gray-900 border-0 p-4 relative" style={{ width: '440px', height: '440px' }}>
                {!isMounted ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="w-full h-full bg-gray-800/50" />
                    </div>
                ) : (
                    <ScatterChart
                        width={400}
                        height={400}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
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