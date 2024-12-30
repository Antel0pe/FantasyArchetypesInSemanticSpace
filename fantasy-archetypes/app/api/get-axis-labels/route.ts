import { openai } from "@ai-sdk/openai";
import { generateObject, JSONParseError } from "ai";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { z } from "zod";

const requestSchema = z.array(
    z.object({
        text: z.string(),
        x: z.string(),
    })
)

const AxisInterpretation = z.object({
    positive: z.string(),
    negative: z.string(),
    oneWordDescription: z.string(),
});

export type AxisInterpretationType = z.infer<typeof AxisInterpretation>;

export async function POST(request: Request) {

    try {

        const body = await request.json();
        const items = requestSchema.parse(body);


        const completion = generateObject({
            model: openai('gpt-4o-mini'),
            schema: AxisInterpretation,
            prompt: `You are given a list of folktale story data and their x coordinate from a PCA analysis, sorted from lowest to highest x value. Your goal is to identify how stories systematically change as x increases to determine what this PCA dimension represents.

            Analyze patterns across the full range including middle values, not just extremes. Look for aspects readers care about (themes, characters, plot, purpose).

            Return ONLY a JSON object with three properties: 
            - "negative": what characterizes low x values (1-2 words)
            - "positive": what characterizes high x values (1-2 words)  
            - "oneWordDescription": single word capturing the dimension

            Example: {"negative": "personal journey", "positive": "cosmic forces", "oneWordDescription": "scopeScale"}
            
            Coordinate Data:
            ${JSON.stringify(items)}`
        });

        return (await completion).toJsonResponse();
    } catch (error) {
        console.error('Error getting axis interpretation:', error);
        return NextResponse.json(
            { message: 'Failed to generate axis interpretation' },
            { status: 500 }
        );
    }
}