from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from openai import OpenAI
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

app = FastAPI(title="Word Embedding Analysis API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("NODE_FRONTEND_URL"), "https://fantasy-archetypes-in-semantic-space.vercel.app", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class TermLists(BaseModel):
    left_terms: List[str]
    right_terms: List[str]

class EmbeddingInput(BaseModel):
    embeddings: List[List[float]]

class CoordinateResponse(BaseModel):
    coordinates: List[float]

def get_embedding(text: str, model: str = "text-embedding-3-small") -> List[float]:
    """Get embedding for a single text using OpenAI API"""
    return client.embeddings.create(input=text, model=model).data[0].embedding

def create_axis(negative_terms: List[str], positive_terms: List[str]) -> tuple:
    """Create an axis based on positive and negative anchor terms"""
    pos_embeddings = []
    for term in positive_terms:
        pos_embeddings.append(get_embedding(term))

    neg_embeddings = []
    for term in negative_terms:
        neg_embeddings.append(get_embedding(term))

    pos_embeddings = np.array(pos_embeddings)
    neg_embeddings = np.array(neg_embeddings)

    pos_centroid = np.mean(pos_embeddings, axis=0)
    neg_centroid = np.mean(neg_embeddings, axis=0)

    return neg_centroid, pos_centroid

@app.post("/create-axis", response_model=Dict[str, List[float]])
async def create_axis_endpoint(terms: TermLists):
    """Create the good-evil axis from term lists"""
    try:
        evil_center, good_center = create_axis(terms.left_terms, terms.right_terms)
        return {
            "evil_center": evil_center.tolist(),
            "good_center": good_center.tolist()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/cosine-similarity", response_model=CoordinateResponse)
async def get_cosine_similarity(
    term: List[float],
    describingTerms: EmbeddingInput,
):
    """Return cosine similarity of terms against embeddings"""
    try:
        coordinates = []
        
        for embedding in describingTerms.embeddings:
            similarity = cosine_similarity([term, embedding])[0][1]
            
            coordinates.append(similarity)
            
        return {"coordinates": coordinates}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze-embeddings", response_model=CoordinateResponse)
async def analyze_embeddings(
    embeddings: EmbeddingInput,
    good_center: List[float],
    evil_center: List[float]
):
    """Analyze embeddings against the good-evil axis"""
    try:
        coordinates = []
        
        for embedding in embeddings.embeddings:
            good_similarity = cosine_similarity([embedding, good_center])[0][1]
            evil_similarity = cosine_similarity([embedding, evil_center])[0][1]
            
            coordinates.append((good_similarity - evil_similarity) / 2)
            
        return {"coordinates": coordinates}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/complete-analysis")
async def complete_analysis(
    terms: TermLists,
    embeddings: EmbeddingInput
):
    """Perform complete analysis in one step"""
    try:
        # Create axis
        axis_response = await create_axis_endpoint(terms)
        # Analyze embeddings
        analysis = await analyze_embeddings(
            embeddings,
            axis_response["good_center"],
            axis_response["evil_center"]
        )
        
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))