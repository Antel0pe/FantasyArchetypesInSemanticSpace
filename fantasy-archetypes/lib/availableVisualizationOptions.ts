import { Microscope, Wand } from "lucide-react";
import { scientificFieldsData, fantasyArchetypesData, ArchetypeNode } from "./data";

export enum VisualizationNames {
    ScientificFields = 'Scientific Fields',
    FantasyArchetypes = 'FantasyArchetypes'
};


export enum AvailableGraphVisualizationOptions {
    Scatter = 'Scatter',
    Heatmap = 'Heatmap',
    TwoDimensionalPlot = '2D Plot',
}

// get all the visualization options for a given visualization 
export const getAvailableVisualizationsForOption = (data: Partial<Record<AvailableGraphVisualizationOptions, ArchetypeNode[]>>): AvailableGraphVisualizationOptions[] => {
    return Object.keys(data)
        .filter((k): k is keyof typeof AvailableGraphVisualizationOptions => k in AvailableGraphVisualizationOptions)
        .map(k => AvailableGraphVisualizationOptions[k])

}

// Since the availableVisualizations data structure below, in the nodedata only contains some of the options from AvailableGraphVisualizationOptions enum - NOT all, have to use this hack to index into the object with visualization option and get the correct nodeData
export const getNodeDataForVisualizationOption = (nodeData: Partial<Record<AvailableGraphVisualizationOptions, ArchetypeNode[]>>, option: AvailableGraphVisualizationOptions): ArchetypeNode[] => {
    return nodeData[option] ?? []
}

export const availableVisualizations = [
    {
        name: VisualizationNames.ScientificFields,
        icon: Microscope,
        nodeData: {
            [AvailableGraphVisualizationOptions.Scatter]: scientificFieldsData,
        },
    },
    {
        name: VisualizationNames.FantasyArchetypes,
        icon: Wand,
        nodeData: {
            [AvailableGraphVisualizationOptions.Scatter]: fantasyArchetypesData
        },
    },
]
