'use client';

import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import Plot from 'react-plotly.js';
import { Card } from "@/components/ui/card";
import { PlotMouseEvent } from 'plotly.js';
import { X } from 'lucide-react';
import { ArchetypeNode, DisplayNode, GraphConfig } from '@/lib/availableVisualizationOptions';

type Props = {
    nodeData: ArchetypeNode[]
    selectedArchetype: ArchetypeNode | null
    setSelectedArchetype: Dispatch<ArchetypeNode>
    graphConfig: GraphConfig | null
}

const HeatmapGraphViewer = ({ nodeData = [], selectedArchetype, setSelectedArchetype, graphConfig }: Props) => {
    const [isMounted, setIsMounted] = useState(false);

    const ranges = useMemo(() => {
        const x = nodeData.map(d => d.x);
        const y = nodeData.map(d => d.y);
        return {
            x: { min: Math.min(...x), max: Math.max(...x) },
            y: { min: Math.min(...y), max: Math.max(...y) }
        };
    }, [nodeData]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Transform data for heatmap
    const processDataForHeatmap = () => {
        // Find min/max values for x and y to create grid
        const xValues = nodeData.map(node => node.x);
        const yValues = nodeData.map(node => node.y);

        const xMin = Math.min(...xValues);
        const xMax = Math.max(...xValues);
        const yMin = Math.min(...yValues);
        const yMax = Math.max(...yValues);

        // Create grid cells
        const gridSize = 10; // Adjustable grid resolution
        const xStep = (xMax - xMin) / gridSize;
        const yStep = (yMax - yMin) / gridSize;
        console.log(xMin, xMax)
        console.log(yMin, yMax)

        // Initialize density matrix
        const density = Array(gridSize).fill(0).map(() => Array(gridSize).fill(0));

        // Calculate density
        nodeData.forEach(node => {
            const xIndex = Math.min(
                Math.floor((node.x - xMin) / xStep),
                gridSize - 1
            );
            const yIndex = Math.min(
                Math.floor((node.y - yMin) / yStep),
                gridSize - 1
            );
            density[yIndex][xIndex]++; // Increment density at this location
        });

        return {
            z: density,
            x: Array(gridSize).fill(0).map((_, i) => xMin + i * xStep + xStep / 2),
            y: Array(gridSize).fill(0).map((_, i) => yMin + i * yStep + yStep / 2),
        };
    };

    const heatmapData = processDataForHeatmap();

    return (
        <div className="w-full h-full">
            {!isMounted ? (
                <div className="flex items-center justify-center h-full">
                    <div className="w-full h-full bg-gray-800/50" />
                </div>
            ) : (
                <Plot
                    data={[
                        {
                            type: 'heatmap',
                            z: heatmapData.z,
                            x: heatmapData.x,
                            y: heatmapData.y,
                            colorscale: 'RdBu_r',
                            showscale: true,
                            hoverongaps: false,
                            hovertemplate: 'Density: %{z}<extra></extra>',
                        },
                        {
                            type: 'scatter',
                            x: nodeData.map(node => node.x),
                            y: nodeData.map(node => node.y),
                            mode: 'markers',
                            text: nodeData.map(node => node.name),
                            textposition: 'top center',
                            marker: {
                                size: 8,
                                color: nodeData.map(node => node.color),
                                opacity: 0.7,
                            },
                            hovertemplate: '%{text}<extra></extra>',
                        },
                        {
                            type: 'scatter',
                            x: [0, 0],
                            y: [ranges.y.min, ranges.y.max],
                            mode: 'lines',
                            line: {
                                color: 'black',
                                width: 2,
                            },
                            hoverinfo: 'none',
                        },
                        {
                            type: 'scatter',
                            x: [ranges.x.min, ranges.x.max],
                            y: [0, 0],
                            mode: 'lines',
                            line: {
                                color: 'black',
                                width: 2,
                            },
                            hoverinfo: 'none',
                        },
                    ]}
                    layout={{
                        autosize: true,
                        margin: { t: 20, r: 50, b: 20, l: 70 },
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        showlegend: false,
                        xaxis: {
                            showgrid: true,
                            gridcolor: '#4B5563',
                            tickfont: { color: '#9CA3AF' },
                            range: [ranges.x.min, ranges.x.max],
                        },
                        yaxis: {
                            showgrid: true,
                            gridcolor: '#4B5563',
                            tickfont: { color: '#9CA3AF' },
                            range: [ranges.y.min, ranges.y.max],
                        },
                        hovermode: 'closest',
                        ...(graphConfig ? {
                            annotations: [
                                // X-axis labels
                                {
                                    x: ranges.x.max,
                                    y: 0,
                                    xref: 'x',
                                    yref: 'y',
                                    text: graphConfig.x.positive,
                                    showarrow: false,
                                    xanchor: 'left',
                                    yanchor: 'bottom',
                                    font: { color: '#888888 ' }
                                },
                                {
                                    x: ranges.x.min,
                                    y: 0,
                                    xref: 'x',
                                    yref: 'y',
                                    text: graphConfig.x.negative,
                                    showarrow: false,
                                    xanchor: 'right',
                                    yanchor: 'bottom',
                                    font: { color: '#888888 ' }
                                },
                                // Y-axis labels
                                {
                                    x: 0,
                                    y: ranges.y.max,
                                    xref: 'x',
                                    yref: 'y',
                                    text: graphConfig.y.positive,
                                    showarrow: false,
                                    xanchor: 'right',
                                    yanchor: 'top',
                                    font: { color: '#888888 ' }
                                },
                                {
                                    x: 0,
                                    y: ranges.y.min,
                                    xref: 'x',
                                    yref: 'y',
                                    text: graphConfig.y.negative,
                                    showarrow: false,
                                    xanchor: 'right',
                                    yanchor: 'bottom',
                                    font: { color: '#888888 ' }
                                }
                            ]
                        } : {})

                    }}
                    config={{
                        displayModeBar: false,
                        responsive: true,
                    }}
                    style={{ width: '100%', height: '100%' }}
                    useResizeHandler={true}
                    onClick={(data: PlotMouseEvent) => {
                        // Only handle clicks on the scatter points, ignore clicks on the heatmap
                        if (data.points?.[0]?.curveNumber === 1) { // Second trace (scatter plot)
                            const index = data.points[0].pointIndex;
                            setSelectedArchetype(nodeData[index]);
                        }
                    }}
                />
            )}
        </div>
    );
};

export default HeatmapGraphViewer;