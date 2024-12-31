"use client"

import React, { useState, useMemo, useCallback, useEffect } from "react"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import debounce from 'debounce';
import { AxisInterpretation } from '@/lib/api';
import { FolkStory } from "@/app/folkStories/page"
import { cn } from "@/lib/utils"
import { CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "cmdk"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Command } from "./ui/command"
import { Check, ChevronsUpDown } from "lucide-react"

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
    story: FolkStory
}

type Props = {
    data: PointData[]
    xLabel: AxisInterpretation
    yLabel: AxisInterpretation
    allLabels: AxisInterpretation[]
    switchAxis: (axis: 'x' | 'y', compNum: number) => void;
}

export default function ScatterPlotWithGridLayout({ data, xLabel, yLabel, allLabels, switchAxis }: Props) {
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
    const [xDropdownOpen, setXDropdownOpen] = React.useState(false)
    const [xAxisValue, setXAxisValue] = React.useState(xLabel?.oneWordDescription ?? '')
    const [yDropdownOpen, setYDropdownOpen] = React.useState(false)
    const [yAxisValue, setYAxisValue] = React.useState(yLabel?.oneWordDescription ?? '')

    useEffect(() => {
        setSliders(prevSliders =>
            prevSliders.map(slider =>
                slider.id === 'x' ? { ...slider, name: xLabel.oneWordDescription } : { ...slider, name: yLabel.oneWordDescription }
            )
        )

        setVisualSliders(prevSliders =>
            prevSliders.map(slider =>
                slider.id === 'x' ? { ...slider, name: xLabel.oneWordDescription } : { ...slider, name: yLabel.oneWordDescription }
            )
        )
    }, [xLabel, yLabel])

    useEffect(() => {
        // if (allLabels[0]) {
        //     setXAxisValue(allLabels[0].oneWordDescription)
        // } else {
        //     setXAxisValue('')
        // }

        // if (allLabels[1]) {
        //     setYAxisValue(allLabels[1].oneWordDescription)
        // } else {
        //     setYAxisValue('')
        // }

        setXAxisValue('')
        setYAxisValue('')

    }, [allLabels])


    const dataRanges = useMemo(() => {
        console.log('looking at data ranges!')
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
        console.log('selected points calc!!')

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
        console.log('customized data func')
        const selectedKey = selectedPoint ? `${selectedPoint.x}-${selectedPoint.y}` : null;

        return data.map(point => {
            const isSelected = selectedKey === `${point.x}-${point.y}`;
            return {
                ...point,
                name: point.story.title,
                fill: isSelected ? '#FF0000' : '#0000FF',
                stroke: isSelected ? '#FF0000' : '#0000FF',
                strokeWidth: isSelected ? 2 : 0,
            };
        });
    }, [selectedPoint, sliders])

    const handleSliderChange = (id: string, newValue: number) => {
        console.log('changing slider value')
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
            console.log('debounced slider func')
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
                    <CardTitle>Predicted PCA Values</CardTitle>
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
                        {allLabels && allLabels.length > 0 && (
                            <Popover open={xDropdownOpen} onOpenChange={setXDropdownOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={xDropdownOpen}
                                        className="w-[200px] justify-between"
                                    >
                                        {xAxisValue
                                            ? allLabels.find((label) => label?.oneWordDescription === xAxisValue)?.oneWordDescription
                                            : "Select x axis..."}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search x axis..." className="h-9" />
                                        <CommandList>
                                            <CommandEmpty>No x axis found.</CommandEmpty>
                                            <CommandGroup>
                                                {allLabels.map((label, idx) => (
                                                    <CommandItem
                                                        key={label.oneWordDescription + '-' + idx}
                                                        value={label.oneWordDescription}
                                                        onSelect={(currentValue) => {
                                                            setXAxisValue(currentValue === xAxisValue ? "" : currentValue)
                                                            setXDropdownOpen(false)
                                                            switchAxis('x', idx)
                                                        }}
                                                    >
                                                        {label.oneWordDescription}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                xAxisValue === label.oneWordDescription ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        )}
                        <Popover open={yDropdownOpen} onOpenChange={setYDropdownOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={yDropdownOpen}
                                    className="w-[200px] justify-between"
                                >
                                    {yAxisValue
                                        ? allLabels.find((label) => label.oneWordDescription === yAxisValue)?.oneWordDescription
                                        : "Select y axis..."}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search y axis..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>No y axis found.</CommandEmpty>
                                        <CommandGroup>
                                            {allLabels.map((label, idx) => (
                                                <CommandItem
                                                    key={label.oneWordDescription+ '-' + idx}
                                                    value={label.oneWordDescription}
                                                    onSelect={(currentValue) => {
                                                        setYAxisValue(currentValue === yAxisValue ? "" : currentValue)
                                                        setYDropdownOpen(false)
                                                        switchAxis('y', idx)
                                                    }}
                                                >
                                                    {label.oneWordDescription}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto",
                                                            yAxisValue === label.oneWordDescription ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </CardContent>
            </Card>

            <Card className="col-span-1">
                <CardHeader>
                    <CardTitle>Selected Point Info</CardTitle>
                </CardHeader>
                <CardContent>
                    {selectedPoint ? (
                        <div className="overflow-y-auto h-40">
                            <p className="font-bold">{selectedPoint.story.title}</p>
                            <p>{selectedPoint.story.full_text}</p>
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
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}

