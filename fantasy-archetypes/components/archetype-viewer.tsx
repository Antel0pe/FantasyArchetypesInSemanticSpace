'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Search, Twitter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { nodes, ArchetypeNode } from '@/lib/mockData'

type VisualizationType = 'scatter' | 'kdtree' | 'voronoi' | 'mst'

export default function ArchetypeViewer() {
  const [searchQuery, setSearchQuery] = useState('darth vader')
  const [selectedArchetype, setSelectedArchetype] = useState<ArchetypeNode | null>(null)
  const [hoveredArchetype, setHoveredArchetype] = useState<ArchetypeNode | null>(null)
  const [visualizationType, setVisualizationType] = useState<VisualizationType>('scatter')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const handleNodeHover = useCallback((node: ArchetypeNode | null) => {
    setHoveredArchetype(node)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawNode = (node: ArchetypeNode, isHovered: boolean) => {
      ctx.beginPath()
      ctx.arc(node.x, 400 - node.y, isHovered ? 10 : 8, 0, 2 * Math.PI)
      ctx.fillStyle = node.color
      ctx.fill()
      ctx.fillStyle = 'white'
      ctx.font = isHovered ? 'bold 12px Arial' : '10px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(node.id, node.x, 400 - node.y)
    }

    // Clear the canvas
    ctx.clearRect(0, 0, 400, 400)

    // Draw axes
    ctx.strokeStyle = '#4B5563'
    ctx.beginPath()
    ctx.moveTo(0, 380)
    ctx.lineTo(400, 380)
    ctx.moveTo(20, 0)
    ctx.lineTo(20, 400)
    ctx.stroke()

    // Label axes
    ctx.fillStyle = '#9CA3AF'
    ctx.font = '12px Arial'
    ctx.fillText('O', 10, 395)
    ctx.fillText('X', 390, 395)
    ctx.fillText('Y', 5, 10)

    // Draw nodes
      nodes.forEach((node) => {
      drawNode(node, node === hoveredArchetype)
    })

    // TODO: Implement other visualization types (KD Tree, Voronoi, MST)
    // This would require additional logic and potentially external libraries

  }, [hoveredArchetype, visualizationType])

  const handleCanvasMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const hoveredNode = nodes.find(node => 
      Math.sqrt(Math.pow(node.x - x, 2) + Math.pow((400 - node.y) - y, 2)) < 10
    )

    handleNodeHover(hoveredNode || null)
  }, [handleNodeHover])

  const handleCanvasMouseLeave = useCallback(() => {
    handleNodeHover(null)
  }, [handleNodeHover])

  const handleCanvasClick = useCallback(() => {
    if (hoveredArchetype) {
      setSelectedArchetype(hoveredArchetype)
    }
  }, [hoveredArchetype])

  return (
    <div className="min-h-screen bg-black text-white p-6 relative">
      <h1 className="text-4xl font-bold text-center mb-8">
        Fantasy Archetypes Embeddings
      </h1>
      
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-gray-800 text-white hover:bg-gray-700"
          asChild
        >
          <a
            href="https://x.com/JungleSilicon/status/1865604152329388298"
            target="_blank"
            rel="noopener noreferrer"
          >
            Original Inspiration
          </a>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-gray-800 text-white hover:bg-gray-700"
          asChild
        >
          <a
            href="https://x.com/JungleSilicon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-4 h-4 mr-2" />
            Original Creator
          </a>
        </Button>
      </div>

      {/* Search Section */}
      {/* <div className="flex justify-center gap-2 mb-8">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64 bg-gray-800 border-gray-700"
          placeholder="Search archetype..."
        />
        <Button variant="secondary" className="bg-gray-800 hover:bg-gray-700">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div> */}

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left Column - Graph and Visualization Options */}
        <div className="space-y-4">
          <Card className="bg-gray-900 border-0 p-4 relative" style={{ width: '400px', height: '400px' }}>
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              onMouseMove={handleCanvasMouseMove}
              onMouseLeave={handleCanvasMouseLeave}
              onClick={handleCanvasClick}
              className="cursor-pointer"
              aria-label="Archetype visualization graph"
            />
          </Card>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={visualizationType === 'scatter' ? 'default' : 'secondary'}
              onClick={() => setVisualizationType('scatter')}
            >
              Scatter Plot
            </Button>
            <Button
              variant={visualizationType === 'kdtree' ? 'default' : 'secondary'}
              onClick={() => setVisualizationType('kdtree')}
            >
              KD Tree
            </Button>
            <Button
              variant={visualizationType === 'voronoi' ? 'default' : 'secondary'}
              onClick={() => setVisualizationType('voronoi')}
            >
              Voronoi Diagram
            </Button>
            <Button
              variant={visualizationType === 'mst' ? 'default' : 'secondary'}
              onClick={() => setVisualizationType('mst')}
            >
              Minimum Spanning Tree
            </Button>
          </div>
        </div>

        {/* Right Column - Information */}
        <div className="bg-gray-800 rounded-lg p-6">
          {selectedArchetype ? (
            <>
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-3xl font-bold">{selectedArchetype.name}</h2>
                <div 
                  className="w-24 h-24 rounded-full" 
                  style={{ backgroundColor: selectedArchetype.color }}
                  aria-hidden="true"
                />
              </div>

              <div className="mb-6">
                <h3 className="text-xl mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedArchetype.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-gray-700 hover:bg-gray-600"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4 text-gray-300">
                <p>{selectedArchetype.description}</p>
                <Button variant="secondary" className="bg-gray-700 hover:bg-gray-600">
                  Show more
                </Button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-400">Select an archetype to view details</p>
          )}
        </div>
      </div>
    </div>
  )
}

