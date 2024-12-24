"use client"

import CircularBarGraph from "@/components/circular-bar-graph";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react";
import { getCosineSimilarity } from "@/lib/axisGeneration/api";

const initialGraphData: DataPoint[] = [
];

export interface DataPoint {
    name: string;
    embedding: number[];
    value: number;
}


export default function Home() {
    const [centerText, setCenterText] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [newItemName, setNewItemName] = useState('');
    const [dataEmbeddings, setDataEmbeddings] = useState<DataPoint[]>([]);
    const [centerEmbedding, setCenterEmbedding] = useState<number[]>([]);

    useEffect(() => {
        const calculateSimilarity = async () => {
            // Filter items that need calculation (value === 0)
            const itemsToCalculate = dataEmbeddings.filter(item => item.value === 0);
            if (itemsToCalculate.length === 0 || centerEmbedding.length === 0) return;

            try {
                const response = (await getCosineSimilarity(centerEmbedding, { "embeddings": itemsToCalculate.map(item => item.embedding) })).coordinates;

                let embeddingIndex = 0;
                const newDataEmbeddings = dataEmbeddings.map(item => {
                    if (item.value === 0) {
                        const updatedItem = {
                            ...item,
                            value: response[embeddingIndex] * 100
                        };
                        embeddingIndex++;
                        return updatedItem;
                    }
                    return item;
                });

                setDataEmbeddings(newDataEmbeddings);
            } catch (error) {
                console.error('Error calculating similarity:', error);
            }
        };

        calculateSimilarity();
    }, [dataEmbeddings, centerEmbedding]);

    const handleAddItem = async () => {
        if (newItemName) {
            const embeddings = await fetchEmbeddings(newItemName);
            if (embeddings) {
                setDataEmbeddings([...dataEmbeddings, {
                    name: newItemName,
                    value: Number(0),
                    embedding: embeddings
                }]);
                setNewItemName('');
            }
        }
    };

    const fetchEmbeddings = async (text: string) => {
        try {
            const response = await fetch('/api/generate-embeddings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: [text] })
            });
            const data = await response.json();
            return data.embeddings[text];
        } catch (error) {
            console.error('Error fetching embeddings:', error);
            return null;
        }
    };

    const handleSave = async () => {
        setIsEditing(false);
        const embeddings = await fetchEmbeddings(centerText);
        if (embeddings) {
            console.log('center text embedding received!')
            setCenterEmbedding(embeddings);
            setDataEmbeddings([]);
        }
    };

    const handleDeleteItem = (index: number) => {
        setDataEmbeddings(dataEmbeddings.filter((_, i) => i !== index));
    };

    const handleAddPredefinedItems = () => {
        const predefinedItems: DataPoint[] = [
            { name: 'Item A', value: 50, embedding: [0] },
            { name: 'Item B', value: 75, embedding: [0] },
            { name: 'Item C', value: 25, embedding: [0] },
            { name: 'Item D', value: 100, embedding: [0] },
        ];
        setDataEmbeddings([...dataEmbeddings, ...predefinedItems]);
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex flex-col items-center">
                    <CircularBarGraph centerText={centerText} data={dataEmbeddings} />
                    <Button
                        onClick={handleAddPredefinedItems}
                        className="mt-4"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Predefined Items
                    </Button>
                </div>
                <div className="w-64 flex flex-col gap-4">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Title:</h2>
                        <div className="flex items-center gap-2">
                            {isEditing ? (
                                <Input
                                    type="text"
                                    value={centerText}
                                    onChange={(e) => setCenterText(e.target.value)}
                                    className="flex-grow"
                                />
                            ) : (
                                <span className="flex-grow">{centerText}</span>
                            )}
                            <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
                                {isEditing ? 'Save' : 'Edit'}
                            </Button>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Items:</h2>
                        <ScrollArea className="h-[300px] w-full rounded-md border p-4 overflow-y-auto">
                            {dataEmbeddings.map((item, index) => (
                                <div key={index} className="flex items-center justify-between py-2">
                                    <span>{item.name}: {item.value}</span>
                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(index)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </ScrollArea>
                        <div className="mt-4 space-y-2">
                            <Input
                                type="text"
                                placeholder="New item name"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                            />
                            <Button onClick={() => handleAddItem()} className="w-full">Add Item</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

