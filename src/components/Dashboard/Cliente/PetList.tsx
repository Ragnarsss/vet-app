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
    <div className="space-y-4 mt-4">
      <div className="flex justify-end mb-2">
        <Button onClick={() => onCreate()}>Agregar Mascota</Button>
      </div>
      {pets.map((pet) => (
        <Card
          key={pet.id}
          className="p-4 flex flex-col md:flex-row md:items-center md:justify-between bg-muted"
        >
          <div>
            <div className="font-semibold text-lg flex items-center gap-2">
              {pet.name} <Badge variant="outline">{pet.species}</Badge>
            </div>
            <div className="text-sm text-muted-foreground flex flex-wrap gap-2 mt-1">
              {pet.breed && (
                <Badge variant="secondary">Raza: {pet.breed}</Badge>
              )}
              {pet.age !== undefined && (
                <Badge variant="secondary">Edad: {pet.age} años</Badge>
              )}
              {pet.sex && <Badge variant="secondary">Sexo: {pet.sex}</Badge>}
              {pet.weight !== undefined && (
                <Badge variant="secondary">Peso: {pet.weight}kg</Badge>
              )}
              {pet.color && (
                <Badge variant="secondary">Color: {pet.color}</Badge>
              )}
              {pet.marks && (
                <Badge variant="secondary">Marcas: {pet.marks}</Badge>
              )}
              {pet.birth_date && (
                <Badge variant="secondary">Nacimiento: {pet.birth_date}</Badge>
              )}
              {pet.notes && (
                <Badge variant="secondary">Notas: {pet.notes}</Badge>
              )}
            </div>
          </div>
          <div className="flex gap-2 mt-2 md:mt-0">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleEdit(pet)}
            >
              Editar
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(pet.id!)}
            >
              Eliminar
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PetList;
