import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateReservation } from "./hooks/useCreateReservation";
import { useClientPets } from "./hooks/useClientPets";
import { useVeterinarians } from "./hooks/useVeterinarians";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

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
  const { createReservation, loading, error, success } = useCreateReservation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationFormInputs>({
    resolver: zodResolver(reservationSchema),
    mode: "onTouched",
  });

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
      });
      onSuccess("¡Reserva agendada con éxito!");
      reset();
      onClose();
    } catch (e) {
      onError("Error al agendar la reserva. Inténtalo más tarde." + e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Fecha y Hora:</label>
        <Input
          type="datetime-local"
          {...register("date_time")}
          disabled={loading}
        />
        {errors.date_time && (
          <span className="text-red-500 text-xs">
            {errors.date_time.message}
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1">Mascota:</label>
        <Select {...register("pet_id")} disabled={loading || petsLoading}>
          <option value="">Selecciona una mascota</option>
          {pets.map((pet) => (
            <option key={pet.id} value={pet.id}>
              {pet.name}
            </option>
          ))}
        </Select>
        {errors.pet_id && (
          <span className="text-red-500 text-xs">{errors.pet_id.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-1">Nombre de la Mascota:</label>
        <Input
          type="text"
          {...register("pet_name")}
          placeholder="Nombre de la mascota"
          disabled={loading}
        />
        {errors.pet_name && (
          <span className="text-red-500 text-xs">
            {errors.pet_name.message}
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1">Veterinario:</label>
        <Select
          {...register("veterinarian_id")}
          disabled={loading || vetsLoading}
        >
          <option value="">Selecciona un veterinario</option>
          {veterinarians.map((vet) => (
            <option key={vet.id} value={vet.id}>
              {vet.user.name}
            </option>
          ))}
        </Select>
        {errors.veterinarian_id && (
          <span className="text-red-500 text-xs">
            {errors.veterinarian_id.message}
          </span>
        )}
      </div>
      <div>
        <label className="block mb-1">Observaciones:</label>
        <Textarea
          {...register("notes")}
          placeholder="Escribe alguna observación (opcional)"
          disabled={loading}
        />
        {errors.notes && (
          <span className="text-red-500 text-xs">{errors.notes.message}</span>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Agendando..." : "Confirmar"}
      </Button>
      {success && <Alert className="alert-success">{success}</Alert>}
      {error && <Alert className="alert-error">{error}</Alert>}
    </form>
  );
};

export default ReservationForm;
