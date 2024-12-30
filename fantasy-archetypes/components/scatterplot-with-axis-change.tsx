"use client"

import React, { useState, useMemo, useCallback } from "react"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import debounce from 'debounce';
import { AxisInterpretation } from '@/lib/api';

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
    },
} satisfies ChartConfig

// Custom tooltip component for hover
const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload
        return (
            <Card className="p-2 shadow-lg bg-white">
                <CardHeader className="p-2">
                    <CardTitle className="text-lg">{data.name}</CardTitle>
                    <CardDescription>{data.category}</CardDescription>
                </CardHeader>
                <CardContent className="p-2">
                    <p className="text-sm">X: {data.x}</p>
                    <p className="text-sm">Y: {data.y}</p>
                </CardContent>
            </Card>
        )
    }
    return null
}

export interface PointData {
    x: number,
    y: number,
    name: string,
    category: string,
}

type Props = {
    data: PointData[]
    xLabel: AxisInterpretation
    yLabel: AxisInterpretation
}

export default function ScatterPlotWithGridLayout({ data, xLabel, yLabel }: Props) {
    const [sliders, setSliders] = useState([
        { id: 'x', name: xLabel.oneWordDescription, value: 50 },
        { id: 'y', name: yLabel.oneWordDescription, value: 50 }
    ])
    const [visualSliders, setVisualSliders] = useState([
        { id: 'x', name: xLabel.oneWordDescription, value: 50 },
        { id: 'y', name: yLabel.oneWordDescription, value: 50 }
    ])
    const [newSliderName, setNewSliderName] = useState('')
    const [isAddingSlider, setIsAddingSlider] = useState(false)


    const dataRanges = useMemo(() => {
        const xValues = data.map(p => p.x);
        const yValues = data.map(p => p.y);
        return {
            x: {
                min: Math.min(...xValues),
                max: Math.max(...xValues)
            },
            y: {
                min: Math.min(...yValues),
                max: Math.max(...yValues)
            }
        };
    }, [data]);

    const selectedPoint = useMemo(() => {
        const [xSlider, ySlider] = sliders;

        return data.reduce((closest, point) => {
            // Convert point coordinates to percentages (0-1)
            const xPercent = (point.x - dataRanges.x.min) / (dataRanges.x.max - dataRanges.x.min);
            const yPercent = (point.y - dataRanges.y.min) / (dataRanges.y.max - dataRanges.y.min);

            // Convert slider values to percentages (0-1)
            const targetXPercent = xSlider.value / 100;
            const targetYPercent = ySlider.value / 100;

            // Calculate distance between percentages
            const distance = Math.sqrt(
                Math.pow(xPercent - targetXPercent, 2) +
                Math.pow(yPercent - targetYPercent, 2)
            );

            if (!closest || distance < closest.distance) {
                return { ...point, distance };
            }
            return closest;
        }, null as (typeof data[0] & { distance: number }) | null);
    }, [sliders, dataRanges, data]); // Added missing data dependency

    const customizedData = useMemo(() => {
        const selectedKey = selectedPoint ? `${selectedPoint.x}-${selectedPoint.y}` : null;

        return data.map(point => {
            const isSelected = selectedKey === `${point.x}-${point.y}`;
            return {
                ...point,
                fill: isSelected ? '#FF0000' : '#0000FF',
                stroke: isSelected ? '#FF0000' : '#0000FF',
                strokeWidth: isSelected ? 2 : 0,
            };
        });
    }, [selectedPoint, sliders])

    const handleSliderChange = (id: string, newValue: number) => {
        // Update visual state immediately
        setVisualSliders(prev =>
            prev.map(s => s.id === id ? { ...s, value: newValue } : s)
        )

        // Debounce the expensive calculation
        debouncedUpdateClosestPoint(id, newValue)
    }

    // Create debounced function for updating the actual state
    const debouncedUpdateClosestPoint = useCallback(
        debounce((id: string, newValue: number) => {
            setSliders(prevSliders =>
                prevSliders.map(slider =>
                    slider.id === id ? { ...slider, value: newValue } : slider
                )
            )
        }, 50),
        []
    )

    // const handleAddSlider = () => {
    //     if (newSliderName.trim()) {
    //         const newId = `slider-${sliders.length}`
    //         setSliders([...sliders, { id: newId, name: newSliderName.trim(), value: 50 }])
    //         setVisualSliders([...visualSliders, { id: newId, name: newSliderName.trim(), value: 50 }])
    //         setNewSliderName('')
    //         setIsAddingSlider(false)
    //     }
    // }

    return (
        <div className="w-full grid grid-cols-2 gap-4">
            <Card className="col-span-1">
                <CardHeader>
                    <CardTitle>Adjust Values</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {visualSliders.map(slider => (
                            <div key={slider.id}>
                                <label htmlFor={slider.id} className="block text-sm font-medium text-gray-700 mb-1">
                                    {slider.name}: {slider.value}
                                </label>
                                <Slider
                                    id={slider.id}
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={[slider.value]}
                                    onValueChange={(value) => handleSliderChange(slider.id, value[0])}
                                />
                            </div>
                        ))}
                        {isAddingSlider ? (
                            <div className="space-y-2">
                                <Input
                                    type="text"
                                    placeholder="Enter slider name"
                                    value={newSliderName}
                                    onChange={(e) => setNewSliderName(e.target.value)}
                                />
                                {/* <Button onClick={handleAddSlider} className="mr-2">Done</Button> */}
                                <Button variant="outline" onClick={() => setIsAddingSlider(false)}>Cancel</Button>
                            </div>
                        ) : (
                            <Button onClick={() => setIsAddingSlider(true)}>Add Slider</Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card className="col-span-1">
                <CardHeader>
                    <CardTitle>Selected Point Info</CardTitle>
                </CardHeader>
                <CardContent>
                    {selectedPoint ? (
                        <div>
                            <p className="font-bold">{selectedPoint.name}</p>
                            <p>Category: {selectedPoint.category}</p>
                            <p>X: {selectedPoint.x}</p>
                            <p>Y: {selectedPoint.y}</p>
                        </div>
                    ) : (
                        <p>No point selected</p>
                    )}
                </CardContent>
            </Card>

            <Card className="col-span-2">
                <CardHeader>
                    <CardTitle>Scatter Plot with Interactive Sliders</CardTitle>
                    <CardDescription>Adjust sliders to select the closest point</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid />
                                <XAxis
                                    type="number"
                                    dataKey="x"
                                    name="X Axis"
                                    label={{ value: `${xLabel.negative}->${xLabel.positive}`, position: 'bottom', offset: 0 }}
                                />
                                <YAxis
                                    type="number"
                                    dataKey="y"
                                    name="Y Axis"
                                    label={{ value: `${yLabel.negative}->${yLabel.positive}`, angle: -90, position: 'left' }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Scatter
                                    name="Data Points"
                                    data={customizedData}
                                />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}

