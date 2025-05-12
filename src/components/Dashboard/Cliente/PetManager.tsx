import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/useAuth";
import React, { useState } from "react";
import PetFormModal from "./PetFormModal";
import PetList from "./PetList";
import { CreatePetInput } from "@/types/Inputs";

const PetManager: React.FC = () => {
  const { cliente } = useAuth();
  const customer_id = cliente?.id || "";
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<CreatePetInput | null>(null);

  // Unifica la lógica de crear/editar mascota
  const handleCreateOrEdit = (pet?: CreatePetInput) => {
    setEditingPet(pet || null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingPet(null);
  };

  return (
    <Card className="dashboard-card h-fit max-h-[450px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle>Mascotas</CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden flex-grow">
        <PetFormModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          editingPet={editingPet}
          closeModal={handleCloseModal}
          customer_id={customer_id}
          openCreateModal={() => handleCreateOrEdit()}
        />
        <PetList onCreate={handleCreateOrEdit} />
      </CardContent>
    </Card>
  );
};

export default PetManager;
