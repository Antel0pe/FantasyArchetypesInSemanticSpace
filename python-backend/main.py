from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from openai import OpenAI
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from umap import UMAP
from sklearn.decomposition import PCA

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
    
    
class UMAPParams(BaseModel):
    embeddings: List[List[float]]
    neighborCount: int
    minDist: float
    distanceMeasure: str

class Point(BaseModel):
    x: float
    y: float
    
@app.post("/umap", response_model=List[Point])
async def reduce_dimensions(params: UMAPParams):
    """
    Reduce dimensions of embeddings using UMAP with specified parameters.
    Returns list of points with x,y coordinates.
    
    Args:
        params: UMAPParams object containing:
            embeddings: List of embedding vectors
            neighborCount: Number of neighbors for UMAP
            minDist: Minimum distance between points
            distanceMeasure: Distance metric to use ('euclidean', 'manhattan', etc.)
    
    Returns:
        List of Point objects containing x,y coordinates
    """
    try:
        # Convert embeddings to numpy array
        embeddings_array = np.array(params.embeddings)
        
        # Initialize UMAP
        reducer = UMAP(
            n_neighbors=params.neighborCount,
            min_dist=params.minDist,
            metric=params.distanceMeasure,
            n_components=2,
            random_state=42
        )
        
        # Perform reduction
        reduced = reducer.fit_transform(embeddings_array)
        print(reduced)
        
        # Convert to list of Point objects
        points = [
            Point(x=float(x), y=float(y)) 
            for x, y in reduced
        ]
        
        return points
        
    except ValueError as ve:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid parameters: {str(ve)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error during dimension reduction: {str(e)}"
        )
        

class PCAParams(BaseModel):
    embeddings: List[List[float]]
    n_components: Optional[int] = None  # If None, will use min(n_samples, n_features)
    random_state: Optional[int] = 42

class PCAComponent(BaseModel):
    component: List[float]
    explained_variance_ratio: float

class PCAResponse(BaseModel):
    components: List[PCAComponent]
    total_explained_variance: float
    transformed_data: List[List[float]]

@app.post("/pca", response_model=PCAResponse)
async def reduce_dimensions(params: PCAParams):
    """
    Reduce dimensions of embeddings using PCA and return components with their explained variance ratios.
    Components are ordered by importance (highest to lowest explained variance).
    
    Args:
        params: PCAParams object containing:
            embeddings: List of embedding vectors
            n_components: Number of components to keep (optional)
            random_state: Random state for reproducibility (optional)
    
    Returns:
        PCAResponse object containing:
            components: List of PCAComponent objects with:
                component: The principal component vector
                explained_variance_ratio: Proportion of variance explained by this component
            total_explained_variance: Sum of explained variance ratios for all returned components
    """
    try:
        # Convert embeddings to numpy array
        embeddings_array = np.array(params.embeddings)
        
        # Determine n_components if not specified
        if params.n_components is None:
            params.n_components = min(embeddings_array.shape)
        
        # Initialize and fit PCA
        pca = PCA(
            n_components=params.n_components,
            random_state=params.random_state
        )
        transformed_data = pca.fit_transform(embeddings_array)
        
        # Create list of components with their explained variance ratios
        components_with_ratios = [
            PCAComponent(
                component=component.tolist(),
                explained_variance_ratio=float(ratio)
            )
            for component, ratio in zip(
                pca.components_,
                pca.explained_variance_ratio_
            )
        ]
        
        # Sort by explained variance ratio (highest to lowest)
        components_with_ratios.sort(
            key=lambda x: x.explained_variance_ratio,
            reverse=True
        )
        
        # Calculate total explained variance
        total_variance = float(sum(pca.explained_variance_ratio_))
        
        return PCAResponse(
            components=components_with_ratios,
            total_explained_variance=total_variance,
            transformed_data=transformed_data.tolist(),
        )
        
    except ValueError as ve:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid parameters: {str(ve)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error during PCA: {str(e)}"
        )
