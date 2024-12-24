import { z } from "zod";
import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';


const requestSchema = z.object({
    leftInputs: z.array(z.string()),
    rightInputs: z.array(z.string())
});

const generatedResponseSchema = z.object({
    leftSuggestions: z.array(z.string()),
    rightSuggestions: z.array(z.string())
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(request: Request) {
    console.log('route.ts')
    try {
        const body = await request.json();
        console.log(body)
        const validatedInput = requestSchema.parse(body);
        console.log('route.ts')
        console.log(validatedInput)
        const result = generateObject({
            model: openai('gpt-4-turbo'),
            schema: generatedResponseSchema,
            prompt:
                `You are helping generate opposing attributes to sort high fantasy archetypes for a semantic axis. Return exactly 9 suggestions for each side. Given these inputs:
            Left side: ${validatedInput.leftInputs.filter(Boolean).join(', ')}
            Right side: ${validatedInput.rightInputs.filter(Boolean).join(', ')}
            
            Generate 9 opposing attributes for each side, maintaining thematic consistency.
            Format as JSON: { "leftSuggestions": [...], "rightSuggestions": [...] }`,
        });

        return (await result).toJsonResponse();
    } catch (error) {
        console.error('Generation failed:', error);
        return NextResponse.json(
            { message: 'Failed to generate suggestions' },
            { status: 500 }
        );
    }
}