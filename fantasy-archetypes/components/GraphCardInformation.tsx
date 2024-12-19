import { ArchetypeNode } from "@/lib/data";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type Props = {
    selectedArchetype: ArchetypeNode | null
}

const GraphCardInformation = ( { selectedArchetype }: Props) => {
    
    return (
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
    </div >
    )
}

export default GraphCardInformation;