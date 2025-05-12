import { useClientPets } from "./hooks/useClientPets";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pet } from "@/types/Pet";

interface PetListProps {
  onCreate: (pet?: Pet) => void;
}

const PetList: React.FC<PetListProps> = ({ onCreate }) => {
  const { pets, deletePet } = useClientPets();

  const handleEdit = (pet: Pet) => onCreate(pet);
  const handleDelete = async (id: string) => {
    if (window.confirm("¿Eliminar esta mascota?")) {
      await deletePet(id);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex justify-end mb-2">
        <Button onClick={() => onCreate()} size="sm">
          Agregar Mascota
        </Button>
      </div>
      <div className="max-h-[350px] overflow-y-auto pr-1 space-y-2">
        {pets.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No hay mascotas registradas
          </div>
        ) : (
          pets.map((pet) => (
            <Card key={pet.id} className="p-2 bg-muted">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-sm flex items-center gap-1 mb-1">
                    {pet.name}{" "}
                    <Badge variant="outline" className="text-xs">
                      {pet.species}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {pet.breed && (
                      <span className="mr-2">Raza: {pet.breed}</span>
                    )}
                    {pet.age !== undefined && (
                      <span className="mr-2">Edad: {pet.age} años</span>
                    )}
                    {pet.sex && <span>Sexo: {pet.sex}</span>}
                  </div>
                </div>
                <div className="flex flex-shrink-0 gap-1">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7"
                    onClick={() => handleEdit(pet)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7 text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => handleDelete(pet.id!)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PetList;
