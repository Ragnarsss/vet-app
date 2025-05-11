import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/useAuth";
import React, { useState } from "react";
import PetFormModal from "./PetFormModal";
import PetList from "./PetList";

const PetManager: React.FC = () => {
  const { cliente } = useAuth();
  const customer_id = cliente?.id || "";
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);

  const handleCreate = () => {
    setEditingPet(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingPet(null);
  };

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>Mascotas</CardTitle>
      </CardHeader>
      <CardContent>
        <PetFormModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          editingPet={editingPet}
          closeModal={handleCloseModal}
          customer_id={customer_id}
          openCreateModal={handleCreate}
        />
        <PetList onCreate={handleCreate} />
      </CardContent>
    </Card>
  );
};

export default PetManager;
