import React, { useState, useEffect, useCallback } from 'react';
import { generateAxisSuggestions, AxisInput, GeneratedResponse } from '../lib/api';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

interface AxisGeneratorModalProps {
    axis: 'X' | 'Y';
    onGenerated?: (left: string[], right: string[]) => void;
    onClose?: () => void;
}

const createEmptyInputs = (count: number): AxisInput[] =>
    Array.from({ length: count }, (_, i) => ({
        value: '',
        id: `input-${i}-${Math.random().toString(36).substr(2, 9)}`,
    }));

export const AxisGeneratorModal: React.FC<AxisGeneratorModalProps> = ({
    axis,
    onGenerated,
    onClose,
}) => {
    const [leftInputs, setLeftInputs] = useState<AxisInput[]>(() => createEmptyInputs(10));
    const [rightInputs, setRightInputs] = useState<AxisInput[]>(() => createEmptyInputs(10));
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const canGenerate = useCallback(() => {
        const hasLeftValue = leftInputs.some(input => input.value.trim() !== '');
        const hasRightValue = rightInputs.some(input => input.value.trim() !== '');
        return hasLeftValue && hasRightValue;
    }, [leftInputs, rightInputs]);

    const handleInputChange = (index: number, value: string, side: 'left' | 'right'): void => {
        console.log(index, value, side)
        if (side === 'left') {
            setLeftInputs(prev =>
                prev.map((input, i) => i === index ? { ...input, value } : input)
            );
        } else {
            setRightInputs(prev =>
                prev.map((input, i) => i === index ? { ...input, value } : input)
            );
        }
    };

    const handleGenerate = async (): Promise<void> => {
        setIsGenerating(true);
        setError(null);

        try {
            const response = await generateAxisSuggestions(leftInputs, rightInputs);

            setLeftInputs(prev =>
                prev.map((input, i) => ({
                    ...input,
                    value: input.value || response.leftSuggestions[i] || '',
                }))
            );

            setRightInputs(prev =>
                prev.map((input, i) => ({
                    ...input,
                    value: input.value || response.rightSuggestions[i] || '',
                }))
            );

            onGenerated?.(
                leftInputs.map(i => i.value),
                rightInputs.map(i => i.value)
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate suggestions');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                    Generate new axis
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">{axis} - Axis</h2>
                        <p className="text-gray-600">
                            Fill in a few words describing your opposing attributes and generate the rest
                        </p>
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <div className="text-sm text-gray-500">
                            Fill in at least one box in each column
                        </div>
                        <button className={`px-4 py-2 rounded-md transition-colors ${canGenerate() && !isGenerating
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}>
                            Submit
                        </button>
                        <button
                            onClick={handleGenerate}
                            disabled={!canGenerate() || isGenerating}
                            className={`px-4 py-2 rounded-md transition-colors ${canGenerate() && !isGenerating
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                            aria-busy={isGenerating}
                        >
                            {isGenerating ? 'Generating...' : 'Generate AI Suggestions'}
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-8">
                        {[
                            { inputs: leftInputs, side: 'left' as const },
                            { inputs: rightInputs, side: 'right' as const },
                        ].map(({ inputs, side }) => (
                            <div key={side} className="space-y-3">
                                {inputs.map((input, index) => (
                                    <input
                                        key={input.id}
                                        type="text"
                                        value={input.value}
                                        onChange={(e) => handleInputChange(index, e.target.value, side)}
                                        placeholder={`${side === 'left' ? 'Left' : 'Right'} attribute ${index + 1}`}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-black"
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    );
};

export default AxisGeneratorModal;
