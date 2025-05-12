import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateReservation } from "./hooks/useCreateReservation";
import { useClientPets } from "./hooks/useClientPets";
import { useService } from "./hooks/useService";
import { useServiceSelection } from "./hooks/useServiceSelection";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useVeterinarians } from "@/hooks/useVeterinarians";
import { Veterinarian } from "@/types/Veterinarian";

const reservationSchema = z.object({
  date_time: z.string().min(1, "La fecha y hora son obligatorias"),
  pet_id: z.string().min(1, "Selecciona una mascota"),
  pet_name: z.string().min(1, "El nombre de la mascota es obligatorio"),
  veterinarian_id: z.string().min(1, "Selecciona un veterinario"),
  notes: z.string().optional(),
});

type ReservationFormInputs = z.infer<typeof reservationSchema>;

interface ReservationFormProps {
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
  onClose: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  onSuccess,
  onError,
  onClose,
}) => {
  const clientId = localStorage.getItem("cliente_id") || "";
  const { pets, loading: petsLoading } = useClientPets();
  const { veterinarians, loading: vetsLoading } = useVeterinarians();
  const { services, loading: servicesLoading } = useService();
  const { selectedServiceIds, selectedServices, toggleService, totalPrice } =
    useServiceSelection(services);
  const { createReservation, loading, error, success } = useCreateReservation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ReservationFormInputs>({
    resolver: zodResolver(reservationSchema),
    mode: "onTouched",
  });

  // Sincroniza el nombre de la mascota al seleccionar el id
  React.useEffect(() => {
    const selectedPet = pets.find((p) => p.id === watch("pet_id"));
    if (selectedPet) {
      setValue("pet_name", selectedPet.name);
    } else {
      setValue("pet_name", "");
    }
  }, [watch("pet_id"), pets, setValue]);

  const onSubmit = async (form: ReservationFormInputs) => {
    try {
      await createReservation({
        date_time: form.date_time,
        pet_id: form.pet_id,
        pet_name: form.pet_name,
        notes: form.notes,
        customer_id: clientId,
        veterinarian_id: form.veterinarian_id,
        status: "pending",
        service_ids: selectedServiceIds,
      });
      onSuccess("¡Reserva agendada con éxito!");
      reset();
      onClose();
    } catch (e) {
      onError("Error al agendar la reserva. Inténtalo más tarde." + e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date_time">Fecha y Hora</Label>
          <Input
            id="date_time"
            type="datetime-local"
            {...register("date_time")}
            disabled={loading}
            className="rounded-lg border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          {errors.date_time && (
            <span className="text-red-500 text-xs">
              {errors.date_time.message}
            </span>
          )}
        </div>
        <div>
          <Label htmlFor="veterinarian_id">Veterinario</Label>
          <select
            id="veterinarian_id"
            className="w-full rounded-lg border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            {...register("veterinarian_id")}
            disabled={loading || vetsLoading}
          >
            <option value="">Selecciona un veterinario</option>
            {veterinarians.map((vet: Veterinarian) => (
              <option key={vet.id} value={vet.id}>
                {vet.user?.name || "Nombre no disponible"}
              </option>
            ))}
          </select>
          {errors.veterinarian_id && (
            <span className="text-red-500 text-xs">
              {errors.veterinarian_id.message}
            </span>
          )}
          {vetsLoading && (
            <span className="text-muted-foreground text-xs">
              Cargando veterinarios...
            </span>
          )}
          {veterinarians.length === 0 && !vetsLoading && (
            <span className="text-amber-600 text-xs">
              No hay veterinarios disponibles.
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="pet_id">Mascota</Label>
          <select
            id="pet_id"
            className="w-full rounded-lg border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            {...register("pet_id")}
            disabled={loading || petsLoading}
          >
            <option value="">Selecciona una mascota</option>
            {pets.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.name} ({pet.species})
              </option>
            ))}
          </select>
          {errors.pet_id && (
            <span className="text-red-500 text-xs">
              {errors.pet_id.message}
            </span>
          )}
          {petsLoading && (
            <span className="text-muted-foreground text-xs">
              Cargando mascotas...
            </span>
          )}
          {pets.length === 0 && !petsLoading && (
            <span className="text-amber-600 text-xs">
              No tienes mascotas registradas. Registra una mascota primero.
            </span>
          )}
        </div>
        <div>
          <Label htmlFor="pet_name">Nombre de la Mascota</Label>
          <Input
            id="pet_name"
            type="text"
            {...register("pet_name")}
            placeholder="Nombre de la mascota"
            disabled
            className="rounded-lg border-blue-200 bg-gray-100"
          />
          {errors.pet_name && (
            <span className="text-red-500 text-xs">
              {errors.pet_name.message}
            </span>
          )}
        </div>
      </div>
      <div>
        <Label>Servicios</Label>
        {servicesLoading ? (
          <span className="text-muted-foreground text-xs">
            Cargando servicios...
          </span>
        ) : services.length === 0 ? (
          <span className="text-amber-600 text-xs">
            No hay servicios disponibles.
          </span>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {services.map((service) => (
              <label
                key={service.id}
                className="flex items-center gap-2 p-2 rounded-lg border hover:border-blue-400 cursor-pointer transition"
              >
                <input
                  type="checkbox"
                  checked={selectedServiceIds.includes(service.id!)}
                  onChange={() => toggleService(service.id!)}
                  className="accent-blue-600"
                  disabled={loading}
                />
                <span className="font-medium">{service.name}</span>
                <span className="text-xs text-muted-foreground">
                  ${service.price}
                </span>
              </label>
            ))}
          </div>
        )}
        {selectedServices.length > 0 && (
          <div className="mt-3 bg-blue-50 rounded-lg p-3">
            <div className="font-semibold mb-1 text-blue-800">
              Servicios seleccionados:
            </div>
            <ul className="text-sm space-y-1">
              {selectedServices.map((s) => (
                <li key={s.id} className="flex justify-between">
                  <span>{s.name}</span>
                  <span className="text-blue-700 font-semibold">
                    ${s.price}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-2 font-bold text-right text-blue-900">
              Total servicios: ${totalPrice}
            </div>
          </div>
        )}
      </div>
      <div>
        <Label htmlFor="notes">Observaciones</Label>
        <Textarea
          id="notes"
          {...register("notes")}
          placeholder="Escribe alguna observación (opcional)"
          disabled={loading}
          className="rounded-lg border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        {errors.notes && (
          <span className="text-red-500 text-xs">{errors.notes.message}</span>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-lg shadow hover:from-blue-600 hover:to-blue-800 transition"
        disabled={loading}
      >
        {loading ? "Agendando..." : "Confirmar Reserva"}
      </Button>
      {success && <Alert className="alert-success">{success}</Alert>}
      {error && <Alert className="alert-error">{error}</Alert>}
    </form>
  );
};

export default ReservationForm;
