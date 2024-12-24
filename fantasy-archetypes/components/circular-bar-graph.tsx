"use client"

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { DataPoint } from '@/app/deconstruct/page';



interface CircularBarGraphProps {
    centerText: string;
    data: DataPoint[];
}

const CircularBarGraph: React.FC<CircularBarGraphProps> = ({ centerText, data }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const width = 500;
        const height = 500;
        const radius = Math.min(width, height) / 2;

        // Clear any existing SVG content
        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3.pie<DataPoint>()
            .value(d => d.value)
            .sort(null);

        const arc = d3.arc<d3.PieArcDatum<DataPoint>>()
            .innerRadius(radius * 0.4)
            .outerRadius(d => radius * (0.6 + (d.value / d3.max(data, d => d.value)!) * 0.3));

        const arcs = svg.selectAll('.arc')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'arc');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i.toString()));

        arcs.append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('dy', '0.35em')
            .text(d => d.data.name)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .style('font-size', '12px');

        arcs.append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('dy', '1.5em')
            .text(d => d.data.value)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .style('font-size', '10px');

        svg.append('circle')
            .attr('r', radius * 0.35)
            .attr('fill', 'orange');

        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .text(centerText)
            .style('fill', 'white')
            .style('font-size', '20px')
            .style('font-weight', 'bold');

    }, [data, centerText]);

    return (
        <svg ref={svgRef}></svg>
    );
};

export default CircularBarGraph;

