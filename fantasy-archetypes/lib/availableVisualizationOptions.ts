import { Microscope, Wand } from "lucide-react";
import { scientificFieldsData, fantasyArchetypesData } from "./data";

export enum VisualizationNames {
    ScientificFields = 'Scientific Fields',
    FantasyArchetypes = 'FantasyArchetypes'
};

export enum AvailableGraphVisualizationOptions {
    Scatter='Scatter',
    Heatmap='Heatmap',
    TwoDimensionalPlot='2D Plot',
}

export const availableVisualizations = [
    {
        name: VisualizationNames.ScientificFields,
        icon: Microscope,
        nodeData: scientificFieldsData,
        availableVisualizations: [
            AvailableGraphVisualizationOptions.Scatter,
        ]
    },
    {
        name: VisualizationNames.FantasyArchetypes,
        icon: Wand,
        nodeData: fantasyArchetypesData,
        availableVisualizations: [
            AvailableGraphVisualizationOptions.Scatter,
            AvailableGraphVisualizationOptions.TwoDimensionalPlot,
        ]
    },
]
