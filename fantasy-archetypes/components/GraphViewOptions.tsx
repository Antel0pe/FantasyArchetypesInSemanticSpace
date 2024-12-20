import { Dispatch, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArchetypeNode } from "@/lib/data";
import { AvailableGraphVisualizationOptions, availableVisualizations, VisualizationNames } from "@/lib/availableVisualizationOptions";

type Props = {
    availableVisualizationOptions: AvailableGraphVisualizationOptions[] | null
    visualizationType: AvailableGraphVisualizationOptions | null
    setVisualizationType: Dispatch<AvailableGraphVisualizationOptions>
}


const GraphViewOptions = ({ availableVisualizationOptions, visualizationType, setVisualizationType }: Props) => {

    return (
        <div className="flex flex-wrap gap-2 justify-center">
            {availableVisualizationOptions ? (
                availableVisualizationOptions.map((option, idx) => (
                    <>
                        <Button
                            key={option.toString() + idx}
                            variant={visualizationType === option ? 'default' : 'secondary'}
                            onClick={() => setVisualizationType(option)}
                        >
                            {option}
                        </Button>
                    </>
                ))
            ) : (
                <div>
                    <p>nothing</p>
                </div>
            )}

        </div>
    )
}

export default GraphViewOptions;