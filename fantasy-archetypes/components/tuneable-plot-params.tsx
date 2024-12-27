"use client"

import { useState, useMemo, useEffect } from "react"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CharacterNameEmbeddings } from "@/lib/data"
import { getUMAPCoordinates, Point, UMAPParams } from "@/lib/api"
import { Button } from "./ui/button"

const metricDistanceOptions = ['euclidean', 'manhattan', 'chebyshev', 'cosine', 'correlation', 'braycurtis', 'hamming', 'canberra', 'seuclidean', 'sqeuclidean', 'mahalanobis', 'wminkowski',]

interface CharacterPoint extends Point {
    character: string;
    series: string;
}


type SeriesColorMap = {
    [key: string]: string;
}

const getSeriesColor = (series: string): string => {
    const colorMap: SeriesColorMap = {
        "Harry Potter": "#ff0000",
        "Lord of the Rings": "#00ff00",
        "Percy Jackson": "#ff00ff",
        "Wheel of Time": "#00ffff",
    };
    return colorMap[series] || "#999999"; // Default gray for unknown series
};

type Props = {
    data1: CharacterNameEmbeddings
}

export default function ScatterPlotPage({ data1 }: Props) {
    const [neighborCount, setNeighborCount] = useState(5)
    const [minDist, setMinDist] = useState(0.1)
    const [metricName, setMetricName] = useState('euclidean')

    const [characterPoints, setCharacterPoints] = useState<CharacterPoint[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchUMAPData()
    }, [])

    const fetchUMAPData = async () => {
        const entries = Object.entries(data1);

        const params: UMAPParams = {
            embeddings: entries.map(([_, value]) => value.embedding),
            neighborCount: neighborCount,
            minDist: minDist,
            distanceMeasure: metricName
        }

        try {
            setLoading(true);
            setError(null);

            const result: Point[] = await getUMAPCoordinates(params);

            const pointCharacters: CharacterPoint[] = result.map((point, index) => {
                const [character, data] = entries[index];
                return {
                    ...point,
                    character,
                    series: data.series
                };
            });
            setCharacterPoints(pointCharacters)
            console.log(pointCharacters)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }



    return (
        <div className="flex flex-row h-screen bg-background">
            <aside className="w-full md:w-64 p-6 border-b md:border-r md:border-b-0">
                <Card>
                    <CardHeader>
                        <CardTitle>Plot Parameters</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="neighbor-count">Neighbor Count: {neighborCount}</Label>
                            <Slider
                                id="neighbor-count"
                                min={2}
                                max={Object.keys(data1).length}
                                step={1}
                                value={[neighborCount]}
                                onValueChange={(value) => setNeighborCount(value[0])}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="minDist">Minimum Distance: {minDist}</Label>
                            <Slider
                                id="minDist"
                                min={0}
                                max={1}
                                step={0.01}
                                value={[minDist]}
                                onValueChange={(value) => setMinDist(value[0])}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="metricName">Metric Option</Label>
                            <Select value={metricName} onValueChange={setMetricName}>
                                <SelectTrigger id="metricName">
                                    <SelectValue placeholder="Select a metric" />
                                </SelectTrigger>
                                <SelectContent>
                                    {metricDistanceOptions.map((c) => (
                                        <SelectItem key={c} value={c}>
                                            {c.charAt(0).toUpperCase() + c.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button onClick={fetchUMAPData}>Submit</Button>
                    </CardContent>
                </Card>
            </aside>
            <main className="flex-1 p-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Scatter Plot</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[600px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid />
                                    <XAxis type="number" dataKey="x" name="X" />
                                    <YAxis type="number" dataKey="y" name="Y" />
                                    <Tooltip
                                        cursor={{ strokeDasharray: '3 3' }}
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                const data = payload[0].payload;
                                                return (
                                                    <div className="bg-white p-2 border rounded shadow">
                                                        <p>X: {data.x.toFixed(2)}</p>
                                                        <p>Y: {data.y.toFixed(2)}</p>
                                                        <p>Character: {data.character}</p>
                                                        <p>Series: {data.series}</p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Scatter name="Data Points" data={characterPoints}>
                                        {characterPoints.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={getSeriesColor(entry.series)} />
                                        ))}
                                    </Scatter>
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

