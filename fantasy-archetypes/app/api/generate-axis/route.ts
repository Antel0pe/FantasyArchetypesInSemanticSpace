import { NextResponse } from 'next/server';
import type { GeneratedResponse } from '@/lib/api';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { leftInputs, rightInputs } = body;
        
        const response: GeneratedResponse = {
            leftSuggestions: Array(10).fill('').map((_, i) => `Generated Left ${i}`),
            rightSuggestions: Array(10).fill('').map((_, i) => `Generated Right ${i}`),
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Generation failed:', error);
        return NextResponse.json(
            { message: 'Failed to generate suggestions' },
            { status: 500 }
        );
    }
}