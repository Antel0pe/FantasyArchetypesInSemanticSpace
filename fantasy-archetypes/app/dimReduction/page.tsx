"use client"

import CircularBarGraph from "@/components/circular-bar-graph";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react";
import { getCosineSimilarity } from "@/lib/axisGeneration/api";
import ScatterPlotPage from "@/components/tuneable-plot-params";
import { CharacterNameEmbeddings, characterNameEmbeddings } from "@/lib/data"


export default function Home() {
    const data1: CharacterNameEmbeddings = characterNameEmbeddings;

    return (
        <ScatterPlotPage data1={data1} />
    );
}

