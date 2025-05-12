import { useState } from "react";
import { Service } from "@/types/Service";

export function useServiceSelection(services: Service[]) {
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const selectedServices = services.filter(
    (s) => s.id && selectedServiceIds.includes(s.id)
  );

  // Calcular el precio total de los servicios seleccionados
  const totalPrice = selectedServices.reduce(
    (sum, service) => sum + (service.price || 0),
    0
  );

  return {
    selectedServiceIds,
    selectedServices,
    toggleService,
    setSelectedServiceIds,
    totalPrice,
  };
}
