import { z } from "zod";
import { NextResponse } from 'next/server';
import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';

// Schema definition
const axisInputSchema = z.object({
    value: z.string(),
    id: z.string()
});

const requestSchema = z.object({
    leftInputs: z.array(axisInputSchema),
    rightInputs: z.array(axisInputSchema)
});

const generatedResponseSchema = z.object({
    leftSuggestions: z.array(z.string()),
    rightSuggestions: z.array(z.string())
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedInput = requestSchema.parse(body);

        const result = streamObject({
            model: openai('gpt-4o-mini'),
            schema: generatedResponseSchema,
            prompt:
                `You are helping generate opposing attributes for an axis. Return exactly 10 suggestions for each side. Given these inputs:
            Left side: ${validatedInput.leftInputs.map(i => i.value).filter(Boolean).join(', ')}
            Right side: ${validatedInput.rightInputs.map(i => i.value).filter(Boolean).join(', ')}
            
            Generate 10 opposing attributes for each side, maintaining thematic consistency.
            Format as JSON: { "leftSuggestions": [...], "rightSuggestions": [...] }`,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Generation failed:', error);
        return NextResponse.json(
            { message: 'Failed to generate suggestions' },
            { status: 500 }
        );
    }
}