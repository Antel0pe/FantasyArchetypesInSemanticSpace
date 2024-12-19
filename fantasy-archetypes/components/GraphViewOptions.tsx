import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArchetypeNode } from "@/lib/data";
import { AvailableGraphVisualizationOptions, availableVisualizations, VisualizationNames } from "@/lib/availableVisualizationOptions";

type Props = {
    availableVisualizationOptions: AvailableGraphVisualizationOptions[] | null
}



const GraphViewOptions = ({ availableVisualizationOptions }: Props) => {
    const [visualizationType, setVisualizationType] = useState<AvailableGraphVisualizationOptions | null>();

    // useEffect(() => {
    //     if (selectedVisualization) {
    //         let options = availableVisualizations.filter((v) => v.name === selectedVisualization);
    //         if (options.length > 0) {
    //             setSelectedVisualizationOptions(options[0].availableVisualizations)
    //         }
    //     }
    // }, [selectedVisualization])


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
                        {/* <Button
                            variant={option === AvailableGraphVisualizationOptions.TwoDimensionalPlot ? 'default' : 'secondary'}
                            onClick={() => setVisualizationType(AvailableGraphVisualizationOptions.TwoDimensionalPlot)}
                        >
                            Heatmap
                        </Button> */}
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