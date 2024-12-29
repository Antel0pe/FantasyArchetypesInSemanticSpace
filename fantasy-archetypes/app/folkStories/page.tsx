import React, { useState, useEffect } from 'react';
import ScatterPlotWithTooltip from '@/components/scatterplot-with-axis-change';

// Types for our data
export interface FolkStory {
  genre: string;
  source: string;
  region: string;
  title: string;
  full_text: string;
  tokenCount: number;
  embedding: number[];
}

export default function Page() {
  const [stories, setStories] = useState<FolkStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/folkStoryEmbeddings.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStories(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load stories');
      } finally {
        setIsLoading(false);
      }
    };

    loadStories();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-gray-600">Loading stories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold">Error loading stories</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {stories.length > 0 ? (
        <ScatterPlotWithTooltip data={[]} />
      ) : (
        <p className="text-center text-gray-600">No stories found</p>
      )}
    </div>
  );
}