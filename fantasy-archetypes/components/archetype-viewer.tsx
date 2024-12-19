'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Twitter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ArchetypeNode } from '@/lib/data'

type VisualizationType = 'scatter' | 'kdtree' | 'voronoi' | 'mst'

type Props = {
    nodeData: ArchetypeNode[]
}

export default function ArchetypeViewer({ nodeData }: Props) {
    //   const [searchQuery, setSearchQuery] = useState('darth vader')
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
        nodeData.forEach((node) => {
            drawNode(node, node === hoveredArchetype)
        })

        // TODO: Implement other visualization types (KD Tree, Voronoi, MST)
        // This would require additional logic and potentially external libraries

    }, [hoveredArchetype, visualizationType, nodeData])

    const handleCanvasMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        const hoveredNode = nodeData.find(node =>
            Math.sqrt(Math.pow(node.x - x, 2) + Math.pow((400 - node.y) - y, 2)) < 10
        )

        handleNodeHover(hoveredNode || null)
    }, [handleNodeHover, nodeData])

    const handleCanvasMouseLeave = useCallback(() => {
        handleNodeHover(null)
    }, [handleNodeHover])

    const handleCanvasClick = useCallback(() => {
        if (hoveredArchetype) {
            setSelectedArchetype(hoveredArchetype)
        }
    }, [hoveredArchetype])

    useEffect(() => {
        setSelectedArchetype(null)
    }, [nodeData])

    return (
        <div className="min-h-screen bg-black text-white p-6 relative">

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
                    {/* <div className="flex flex-wrap gap-2 justify-center">
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
          </div> */}
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

