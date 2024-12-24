// Types for the API requests and responses
export interface EmbeddingInput {
    embeddings: number[][];
}

export interface TermLists {
    left_terms: string[];
    right_terms: string[];
}

export interface CoordinateResponse {
    coordinates: number[];
}

export interface AxisCenters {
    evil_center: number[];
    good_center: number[];
}

export interface CosineSimilarityInput {
    term: number[];
    describingTerms: EmbeddingInput;
}

export async function getCosineSimilarity(
    term: number[],
    describingTerms: EmbeddingInput
): Promise<CoordinateResponse> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PYTHON_BACKEND_URL}/cosine-similarity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                term,
                describingTerms,
            }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to calculate cosine similarity');
        }
        
        return await response.json() as CoordinateResponse;
    } catch (error) {
        console.error('Cosine similarity API call failed:', error);
        throw error;
    }
}


// Main API functions
export async function createAxis(terms: TermLists): Promise<AxisCenters> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PYTHON_BACKEND_URL}/create-axis`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(terms),
        });

        if (!response.ok) {
            throw new Error('Failed to create axis');
        }

        return await response.json() as AxisCenters;
    } catch (error) {
        console.error('Create axis API call failed:', error);
        throw error;
    }
}

export async function analyzeEmbeddings(
    embeddings: EmbeddingInput,
    goodCenter: number[],
    evilCenter: number[]
): Promise<CoordinateResponse> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PYTHON_BACKEND_URL}/analyze-embeddings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                embeddings,
                good_center: goodCenter,
                evil_center: evilCenter,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to analyze embeddings');
        }

        return await response.json() as CoordinateResponse;
    } catch (error) {
        console.error('Analyze embeddings API call failed:', error);
        throw error;
    }
}

export async function completeAnalysis(
    terms: TermLists,
    embeddings: EmbeddingInput
): Promise<CoordinateResponse> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PYTHON_BACKEND_URL}/complete-analysis`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                terms,
                embeddings,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to perform complete analysis');
        }

        return await response.json() as CoordinateResponse;
    } catch (error) {
        console.error('Complete analysis API call failed:', error);
        throw error;
    }
}

// Example usage:
/*
const terms = {
    good_terms: ["good", "virtuous", "noble"],
    evil_terms: ["evil", "wicked", "malevolent"]
};

const embeddings = {
    embeddings: [
        [0.1, 0.2, ...], // 1536-dimensional vector
        [0.3, 0.4, ...], // another vector
    ]
};

// Option 1: Complete analysis in one call
const results = await completeAnalysis(terms, embeddings);

// Option 2: Step by step
const axisCenters = await createAxis(terms);
const analysis = await analyzeEmbeddings(
    embeddings,
    axisCenters.good_center,
    axisCenters.evil_center
);
*/