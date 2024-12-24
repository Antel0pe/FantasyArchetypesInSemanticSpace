import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { EmbeddingsResponse } from '@/app/api/generate-embeddings/route';

const createEmptyRow = (inputLength: number) => Array(3).fill('').map((_, i) => ({
    value: '',
    id: `input-${inputLength * 3 + i}`
}));

type Props = {
    onGeneration: (embedding: EmbeddingsResponse) => void
}

const DataGeneratorModal = ( { onGeneration }: Props) => {
    const [inputs, setInputs] = useState(() => Array(3).fill(null).map((_, index) => createEmptyRow(index)));
    const [prompt, setPrompt] = useState('');
    const [count, setCount] = useState('9');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<{
        prompt?: string;
        count?: string;
        general?: string;
    } | null>(null);
    const [open, setOpen] = useState(false);

    const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
        setInputs(prev =>
            prev.map((row, rIndex) =>
                rIndex === rowIndex
                    ? row.map((col, cIndex) =>
                        cIndex === colIndex ? { ...col, value } : col
                    )
                    : row
            )
        );
    };

    const addNewRow = () => {
        setInputs(prev => [...prev, createEmptyRow(prev.length)]);
    };

    const handleCountChange = (value: string) => {
        // Allow any number input, validation will happen on submit
        if (value === '' || !isNaN(Number(value))) {
            setCount(value);
            // Clear any existing count error when user starts typing
            setError(prev => prev ? { ...prev, count: undefined } : null);
        }
    };

    const validateInputs = (): boolean => {
        const newErrors: typeof error = {};

        if (!prompt.trim()) {
            newErrors.prompt = 'Please enter a prompt';
        }

        const numValue = parseInt(count);
        if (!count || isNaN(numValue) || numValue < 9 || numValue > 99) {
            newErrors.count = 'Please enter a number between 9 and 99';
        }

        setError(Object.keys(newErrors).length ? newErrors : null);
        return !Object.keys(newErrors).length;
    };

    const fillInInputsFromGeneration = (suggestions: string[]) => {
        const newInputs = [...inputs];
        let suggestionIndex = 0;

        // Fill existing empty inputs first
        for (let rowIndex = 0; rowIndex < newInputs.length; rowIndex++) {
            for (let colIndex = 0; colIndex < 3; colIndex++) {
                if (!newInputs[rowIndex][colIndex].value && suggestionIndex < suggestions.length) {
                    newInputs[rowIndex][colIndex] = {
                        ...newInputs[rowIndex][colIndex],
                        value: suggestions[suggestionIndex]
                    };
                    suggestionIndex++;
                }
            }
        }

        // Add new rows if we have more suggestions
        while (suggestionIndex < suggestions.length) {
            const newRow = createEmptyRow(newInputs.length);
            for (let i = 0; i < 3 && suggestionIndex < suggestions.length; i++) {
                newRow[i] = {
                    ...newRow[i],
                    value: suggestions[suggestionIndex]
                };
                suggestionIndex++;
            }
            newInputs.push(newRow);
        }

        setInputs(newInputs);
    }

    const handleSubmitEmbeddings = async () => {
        const nonEmptyInputs = inputs
            .flat()
            .filter(input => input.value.trim())
            .map(input => input.value.trim());

        if (nonEmptyInputs.length === 0) {
            setError({ general: 'Please add at least one item before generating embeddings' });
            return;
        }

        try {
            const response = await fetch('/api/generate-embeddings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: nonEmptyInputs
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate embeddings');
            }

            const data: EmbeddingsResponse = await response.json();
            console.log('Embeddings generated:', data);

            onGeneration(data)

            setInputs(Array(3).fill(null).map((_, index) => createEmptyRow(index)));
            setOpen(false);  

        } catch (err) {
            setError({ general: err instanceof Error ? err.message : 'Failed to generate embeddings' });
        }
    };

    const handleGenerate = async () => {
        if (!validateInputs()) {
            return;
        }

        setIsGenerating(true);

        try {
            const response = await fetch('/api/generate-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt,
                    count: parseInt(count),
                    existingItems: inputs.flat().map(i => i.value).filter(Boolean)
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate items');
            }

            const data = await response.json();
            console.log(data)
            fillInInputsFromGeneration(data.suggestions)

        } catch (err) {
            setError({ general: err instanceof Error ? err.message : 'Failed to generate items' });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                    Generate List
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
                <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col h-full overflow-y-auto">
                    <DialogTitle className="text-2xl font-bold mb-4">Generate List Items</DialogTitle>

                    <div className="mb-6">
                        <p className="text-gray-600 mb-4">
                            Enter a prompt describing the items you want to generate and specify the number of items (between 9-99)
                        </p>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={prompt}
                                    onChange={(e) => {
                                        setPrompt(e.target.value);
                                        setError(prev => prev ? { ...prev, prompt: undefined } : null);
                                    }}
                                    placeholder="Enter your prompt here..."
                                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error?.prompt ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {error?.prompt && (
                                    <p className="text-red-500 text-sm mt-1">{error.prompt}</p>
                                )}
                            </div>
                            <div className="w-24">
                                <input
                                    type="number"
                                    value={count}
                                    onChange={(e) => handleCountChange(e.target.value)}
                                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error?.count ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Count"
                                />
                                {error?.count && (
                                    <p className="text-red-500 text-sm mt-1">{error.count}</p>
                                )}
                            </div>
                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className={`px-4 py-2 rounded-md transition-colors ${!isGenerating
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {isGenerating ? 'Generating...' : 'Generate'}
                            </button>
                        </div>
                    </div>

                    {error?.general && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
                            {error.general}
                        </div>
                    )}

                    <div className="flex-1 min-h-0 overflow-y-auto">
                        <div className="grid grid-cols-3 gap-4 p-1">
                            {inputs.flat().map((input, index) => (
                                <input
                                    key={input.id}
                                    type="text"
                                    value={input.value}
                                    onChange={(e) => handleInputChange(
                                        Math.floor(index / 3),
                                        index % 3,
                                        e.target.value
                                    )}
                                    placeholder={`Item ${index + 1}`}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 flex justify-center pt-2">
                        <button
                            onClick={addNewRow}
                            className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                            + Add Row
                        </button>
                        <button
                            onClick={handleSubmitEmbeddings}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DataGeneratorModal;