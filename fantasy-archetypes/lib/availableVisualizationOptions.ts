import { LucideIcon, Microscope, Wand } from "lucide-react";
import { scientificFieldsData, fantasyArchetypesData, fantasyArchetypesDataOnEvilVSGoodExternalVSInternal } from "./data";

export enum VisualizationNames {
    ScientificFields = 'Scientific Fields',
    FantasyArchetypes = 'Fantasy Archetypes'
};

export enum AvailableGraphVisualizationOptions {
    Scatter = 'Scatter',
    Heatmap = 'Heatmap',
    TwoDimensionalPlot = '2D Plot',
}

export interface ArchetypeNode {
    id: string;
    name: string;
    description: string;
    tags: string[];
    color: string;
    x: number;
    y: number;
    originalEmbedding?: number[];
}

export interface DisplayNode {
    id: string;
    name: string;
    description: string;
    tags: string[];
    color: string;
    x: number;
    y: number;
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
    x: { negative: string, positive: string, negativeTerms: string[], positiveTerms: string[] }
    y: { negative: string, positive: string, negativeTerms: string[], positiveTerms: string[] }
}

export const availableVisualizations: VisualizationCategory[] = [
    {
        name: VisualizationNames.FantasyArchetypes,
        icon: Wand,
        supportedGraphTypes: [
            // {
            //     type: AvailableGraphVisualizationOptions.Scatter,
            //     getData: () => fantasyArchetypesData
            // },
            {
                type: AvailableGraphVisualizationOptions.TwoDimensionalPlot,
                getData: () => fantasyArchetypesDataOnEvilVSGoodExternalVSInternal,
                config: {
                    x: {
                        negative: 'evil', positive: 'good', negativeTerms: [
                            "evil", "wicked", "malevolent", "corrupt", "vile",
                            "sinister", "cruel", "malicious", "nefarious", "villainous",
                            "villain", "tyrant", "monster", "demon", "criminal"
                        ],
                        positiveTerms: ["good", "virtuous", "noble", "benevolent", "righteous",
                            "ethical", "moral", "kind", "honorable", "just",
                            "hero", "saint", "benefactor", "altruist", "humanitarian"]
                    },
                    y: {
                        negative: 'external power', positive: 'internal power', negativeTerms: ['internal power',
                            "channeled", "borrowed", "bestowed", "granted", "drawn",
                            "bound", "invoked", "contracted", "acquired", "gifted",
                            "learned", "oath-bound", "wielded", "blessed", "harnessed"
                        ],
                        positiveTerms: ['external power',
                            "innate", "self-derived", "inherent", "inborn", "natural",
                            "willpower", "birthright", "awakened", "destined", "self-mastered",
                            "intrinsic", "soul-bound", "primal", "self-taught", "instinctive"
                        ]
                    }
                }
            },
            {
                type: AvailableGraphVisualizationOptions.Heatmap,
                getData: () => fantasyArchetypesDataOnEvilVSGoodExternalVSInternal,
                config: {
                    x: {
                        negative: 'evil', positive: 'good', negativeTerms: ['d'],
                        positiveTerms: ['a']
                    },
                    y: {
                        negative: 'external power', positive: 'internal power', negativeTerms: ['d'],
                        positiveTerms: ['a']
                    }
                }
            }
        ]
    },
    // {
    //     name: VisualizationNames.ScientificFields,
    //     icon: Microscope,
    //     supportedGraphTypes: [
    //         {
    //             type: AvailableGraphVisualizationOptions.Scatter,
    //             getData: () => scientificFieldsData
    //         }
    //     ]
    // },
]