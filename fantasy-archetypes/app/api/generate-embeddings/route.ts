import { z } from "zod";
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Define the request schema
const requestSchema = z.object({
    items: z.array(z.string())
});

// Define the response type for TypeScript
export type EmbeddingsResponse = {
    embeddings: {
        [key: string]: number[];
    };
};

export async function POST(request: Request) {
    try {
        // Parse and validate the request body
        const body = await request.json();
        const { items } = requestSchema.parse(body);

        // Generate embeddings for each item
        const embeddings: EmbeddingsResponse['embeddings'] = {};
        
        // Process items in parallel for better performance
        await Promise.all(
            items.map(async (item) => {
                const response = await openai.embeddings.create({
                    model: "text-embedding-3-small",
                    input: item,
                    encoding_format: "float"
                });
                
                embeddings[item] = response.data[0].embedding;
            })
        );

        return NextResponse.json({ embeddings });

    } catch (error) {
        console.error('Failed to generate embeddings:', error);
        
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: 'Invalid request format', errors: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: 'Failed to generate embeddings' },
            { status: 500 }
        );
    }
}

// Optional: Set maximum duration for the API route
export const maxDuration = 30;