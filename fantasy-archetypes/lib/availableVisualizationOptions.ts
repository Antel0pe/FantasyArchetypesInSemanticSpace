import { LucideIcon, Microscope, Wand } from "lucide-react";
import { scientificFieldsData, fantasyArchetypesData, ArchetypeNode, fantasyArchetypesDataOnEvilVSGoodExternalVSInternal } from "./data";

export enum VisualizationNames {
    ScientificFields = 'Scientific Fields',
    FantasyArchetypes = 'Fantasy Archetypes'
};

export enum AvailableGraphVisualizationOptions {
    Scatter = 'Scatter',
    Heatmap = 'Heatmap',
    TwoDimensionalPlot = '2D Plot',
}

export function getAvailableGraphTypes(category: VisualizationCategory): AvailableGraphVisualizationOptions[] {
    return category.supportedGraphTypes.map(st => st.type);
}

export function getDataForGraphType(
    category: VisualizationCategory, 
    type: AvailableGraphVisualizationOptions
): ArchetypeNode[] {
    return getGraphType(category, type).getData();
}

export function getGraphType(
    category: VisualizationCategory, 
    type: AvailableGraphVisualizationOptions
): GraphType {
    const graphType = category.supportedGraphTypes.find(st => st.type === type);
    if (!graphType) throw new Error(`Graph type ${type} not supported for ${category.name}`);
    return graphType;
}

export interface VisualizationCategory {
    name: VisualizationNames;
    icon: LucideIcon;
    supportedGraphTypes: GraphType[];
}

export interface GraphType {
    type: AvailableGraphVisualizationOptions;
    getData: () => ArchetypeNode[];
    config?: GraphConfig;
}

export interface GraphConfig {
    xAxis: { negative: string, positive: string }
    yAxis: { negative: string, positive: string }
}

export const availableVisualizations: VisualizationCategory[] = [
    {
        name: VisualizationNames.ScientificFields,
        icon: Microscope,
        supportedGraphTypes: [
            {
                type: AvailableGraphVisualizationOptions.Scatter,
                getData: () => scientificFieldsData
            }
        ]
    },
    {
        name: VisualizationNames.FantasyArchetypes,
        icon: Wand,
        supportedGraphTypes: [
            {
                type: AvailableGraphVisualizationOptions.Scatter,
                getData: () => fantasyArchetypesData
            },
            {
                type: AvailableGraphVisualizationOptions.TwoDimensionalPlot,
                getData: () => fantasyArchetypesDataOnEvilVSGoodExternalVSInternal,
                config: {
                    xAxis: { negative: 'evil', positive: 'good' },
                    yAxis: { negative: 'external power', positive: 'internal power' }
                }
            },
            {
                type: AvailableGraphVisualizationOptions.Heatmap,
                getData: () => fantasyArchetypesDataOnEvilVSGoodExternalVSInternal,
                config: {
                    xAxis: { negative: 'evil', positive: 'good' },
                    yAxis: { negative: 'external power', positive: 'internal power' }
                }
            }
        ]
    }
]