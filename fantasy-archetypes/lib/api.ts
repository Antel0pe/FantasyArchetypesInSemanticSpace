import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { JSONParseError } from "ai";

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
        console.log('api.ts')
        console.log(response)

        if (!response.ok) {
            throw new Error('Failed to generate suggestions');
        }

        return await response.json() as GeneratedResponse;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

export interface UMAPParams {
    embeddings: number[][];
    neighborCount: number;
    minDist: number;
    distanceMeasure: string;
}

export interface Point {
    x: number;
    y: number;
}

export async function getUMAPCoordinates(params: UMAPParams): Promise<Point[]> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PYTHON_BACKEND_URL}/umap`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to get UMAP coordinates');
        }

        const data: Point[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting UMAP coordinates:', error);
        throw error;
    }
}

export interface DataPoint {
    text: string;
    x: string;
}

export interface AxisInterpretation {
    positive: string;
    negative: string;
    oneWordDescription: string;
}

export async function getAxisInterpretation(data: DataPoint[]): Promise<AxisInterpretation> {
    try {
        const response = await fetch('/api/get-axis-labels', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to get interpretation');
        }

        return await response.json();

    } catch (error) {
        console.log('Error getting axis interpretation:', error);
        return {
            negative: '',
            positive: '',
            oneWordDescription: ''
        };
    }
}
