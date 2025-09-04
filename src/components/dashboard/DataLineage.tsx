import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitBranch, User, AlertCircle } from "lucide-react";
import * as d3 from 'd3';

interface LineageNode {
  id: string;
  type: 'table' | 'system' | 'pipeline';
  name: string;
  steward?: string;
}

interface LineageEdge {
  source: string;
  target: string;
  type: 'flows-to' | 'processed-by';
}

// Mock data - replace with actual API call
const mockLineageData = {
  nodes: [
    { id: '1', type: 'table', name: 'Customer_Raw', steward: 'John Doe' },
    { id: '2', type: 'system', name: 'ETL Pipeline' },
    { id: '3', type: 'table', name: 'Customer_Processed' },
    { id: '4', type: 'system', name: 'Analytics Engine' },
    { id: '5', type: 'table', name: 'Customer_Analytics' }
  ],
  edges: [
    { source: '1', target: '2', type: 'flows-to' },
    { source: '2', target: '3', type: 'processed-by' },
    { source: '3', target: '4', type: 'flows-to' },
    { source: '4', target: '5', type: 'processed-by' }
  ]
};

export function DataLineage() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 400;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Create the simulation
    const simulation = d3.forceSimulation(mockLineageData.nodes)
      .force("link", d3.forceLink(mockLineageData.edges)
        .id((d: any) => d.id)
        .distance(100))
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Draw the edges
    const edges = svg.append("g")
      .selectAll("line")
      .data(mockLineageData.edges)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2);

    // Draw the nodes
    const nodes = svg.append("g")
      .selectAll("g")
      .data(mockLineageData.nodes)
      .enter()
      .append("g");

    nodes.append("circle")
      .attr("r", 30)
      .attr("fill", (d: any) => {
        switch(d.type) {
          case 'table': return '#4f46e5';
          case 'system': return '#059669';
          default: return '#9333ea';
        }
      });

    nodes.append("text")
      .text((d: any) => d.name)
      .attr("text-anchor", "middle")
      .attr("dy", 5)
      .attr("fill", "white")
      .style("font-size", "12px");

    // Add drag behavior
    nodes.call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended) as any);

    // Update positions on each tick
    simulation.on("tick", () => {
      edges
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodes.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  }, []);

  const handleAssignSteward = (nodeId: string) => {
    // TODO: Implement steward assignment
    console.log('Assign steward to:', nodeId);
  };

  const handleReportIssue = (nodeId: string) => {
    // TODO: Implement issue reporting
    console.log('Report issue for:', nodeId);
  };

  return (
    <Card className="h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="h-5 w-5" />
          Data Lineage
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-2">
          <Button variant="outline" className="gap-2">
            <User className="h-4 w-4" />
            Assign Steward
          </Button>
          <Button variant="outline" className="gap-2">
            <AlertCircle className="h-4 w-4" />
            Report Issue
          </Button>
        </div>
        <div className="border rounded-lg p-4 bg-background">
          <svg ref={svgRef}></svg>
        </div>
      </CardContent>
    </Card>
  );
}
