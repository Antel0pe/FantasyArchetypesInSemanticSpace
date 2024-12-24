import { z } from "zod";
import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';

// Define the request schema
const requestSchema = z.object({
    prompt: z.string(),
    count: z.number().min(1).max(50), // Limiting max items for safety
    existingItems: z.array(z.string())
});

// Define the response schema
const generatedResponseSchema = z.object({
    suggestions: z.array(z.string())
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedInput = requestSchema.parse(body);
        
        const result = await generateObject({
            model: openai('gpt-4-turbo'),
            schema: generatedResponseSchema,
            prompt: `Generate ${validatedInput.count} unique suggestions based on this prompt: "${validatedInput.prompt}"
                
                Existing items to avoid duplicating:
                ${validatedInput.existingItems.join(', ')}
                
                Return exactly ${validatedInput.count} unique suggestions that don't overlap with the existing items.
                Format as JSON: { "suggestions": [...] }`,
        });

        return result.toJsonResponse();
    } catch (error) {
        console.error('Generation failed:', error);
        return NextResponse.json(
            { message: 'Failed to generate suggestions' },
            { status: 500 }
        );
    }
}