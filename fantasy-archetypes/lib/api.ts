
export interface GeneratedResponse {
    leftSuggestions: string[];
    rightSuggestions: string[];
}

export interface AxisInput {
    value: string;
    id: string;
}

export async function generateAxisSuggestions(leftInputs: AxisInput[], rightInputs: AxisInput[]) {
    try {
        const response = await fetch('/api/generate-axis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                leftInputs: leftInputs.map(i => i.value),
                rightInputs: rightInputs.map(i => i.value),
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate suggestions');
        }

        return await response.json() as GeneratedResponse;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}