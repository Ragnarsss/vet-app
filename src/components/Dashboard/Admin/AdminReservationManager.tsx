import React, { useState, useEffect } from "react";
import {
  useAdminReservationMutations,
  ReservationInput,
} from "./hooks/useAdminReservationMutations";
import { useAdminReservations } from "./hooks/useAdminReservations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const initialForm: ReservationInput = {
  date_time: "",
  pet_id: "",
  pet_name: "",
  notes: "",
  customer_id: "",
  veterinarian_id: "",
  reason: "",
  status: "pending",
  service_ids: [],
};

const reservationSchema = z.object({
  date_time: z.string().min(1, "La fecha y hora son obligatorias"),
  pet_id: z.string().min(1, "ID de mascota requerido"),
  pet_name: z.string().min(1, "Nombre de mascota requerido"),
  notes: z.string().optional(),
  customer_id: z.string().min(1, "ID de cliente requerido"),
  veterinarian_id: z.string().min(1, "ID de veterinario requerido"),
  reason: z.string().optional(),
  status: z.string().min(1, "Estado requerido"),
  service_ids: z.array(z.string()).optional(),
});

type ReservationFormInputs = z.infer<typeof reservationSchema>;

const AdminReservationManager: React.FC = () => {
  const {
    createReservation,
    updateReservation,
    deleteReservation,
    loading,
    error,
  } = useAdminReservationMutations();
  const { reservations, fetchAllReservations } = useAdminReservations();
  const [form, setForm] = useState<ReservationInput>(initialForm);
  const [reservationId, setReservationId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [modal, setModal] = useState<null | "create" | "update" | "delete">(
    null
  );
  const [searchId, setSearchId] = useState("");

  const formHook = useForm<ReservationFormInputs>({
    resolver: zodResolver(reservationSchema),
    defaultValues: initialForm,
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = formHook;

  // Modal helpers
  const openModal = (type: "create" | "update" | "delete") => {
    setModal(type);
    setResult(null);
    setForm(initialForm);
    setReservationId("");
    setSearchId("");
  };
  const closeModal = () => setModal(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceIdsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ids = e.target.value
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
    setForm((prev) => ({ ...prev, service_ids: ids }));
  };

  // Mejor UX: limpiar formulario y cerrar modal tras éxito
  useEffect(() => {
    if (result && modal) {
      const timeout = setTimeout(() => {
        setResult(null);
        closeModal();
        setForm(initialForm);
      }, 1800);
      return () => clearTimeout(timeout);
    }
  }, [result, modal]);

  // Mejor UX: validación simple antes de crear/editar
  const onSubmit = async (data: ReservationFormInputs) => {
    const res = await createReservation({ ...data });
    setResult(res);
    reset();
    closeModal();
  };

  const handleUpdate = async () => {
    if (!reservationId) return;
    if (!form.notes || !form.status) {
      setResult({ error: "Completa los campos de edición" });
      return;
    }
    const res = await updateReservation(reservationId, {
      notes: form.notes,
      status: form.status,
    });
    setResult(res);
  };

  const handleDelete = async () => {
    if (!reservationId) return;
    const res = await deleteReservation(reservationId);
    setResult(res);
  };

  // Cargar reservas al abrir modal de editar/eliminar
  useEffect(() => {
    if (modal === "update" || modal === "delete") {
      fetchAllReservations();
    }
  }, [modal, fetchAllReservations]);

  // Para buscar reserva por ID o por nombre de mascota
  const reservationToEdit = reservations.find(
    (r) =>
      r.id === reservationId ||
      r.pet?.name?.toLowerCase() === reservationId.toLowerCase()
  );

  // Mejor visual: tabla de reservas
  const renderReservationsTable = () => (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full border text-sm rounded-lg overflow-hidden">
        <thead className="bg-blue-50">
          <tr>
            <th className="px-2 py-2">ID</th>
            <th className="px-2 py-2">Mascota</th>
            <th className="px-2 py-2">Cliente</th>
            <th className="px-2 py-2">Fecha</th>
            <th className="px-2 py-2">Estado</th>
            <th className="px-2 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id} className="even:bg-gray-50">
              <td className="px-2 py-1">{r.id}</td>
              <td className="px-2 py-1">{r.pet?.name || "-"}</td>
              <td className="px-2 py-1">{r.customer?.user?.name || "-"}</td>
              <td className="px-2 py-1">
                {r.date_time?.slice(0, 16).replace("T", " ")}
              </td>
              <td className="px-2 py-1">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    r.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : r.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {r.status}
                </span>
              </td>
              <td className="px-2 py-1 flex gap-1">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setReservationId(r.id);
                    setForm({
                      ...form,
                      notes: r.notes || "",
                      status: r.status,
                    });
                    openModal("update");
                  }}
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    setReservationId(r.id);
                    openModal("delete");
                  }}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {reservations.length === 0 && (
        <div className="text-center text-muted-foreground py-6">
          No hay reservas registradas.
        </div>
      )}
    </div>
  );

  return (
    <Card className="max-w-3xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>Gestión de Reservas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 mb-6 justify-center">
          <Button onClick={() => openModal("create")} variant="default">
            Crear Reserva
          </Button>
        </div>
        {renderReservationsTable()}
        {/* Modales de crear, editar, eliminar */}
        <Dialog open={modal === "create"} onOpenChange={closeModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Crear Reserva</DialogTitle>
            </DialogHeader>
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <Label htmlFor="date_time">Fecha y hora</Label>
              <Input
                id="date_time"
                type="datetime-local"
                {...register("date_time")}
              />
              {errors.date_time && (
                <span className="text-xs text-red-500">
                  {errors.date_time.message}
                </span>
              )}
              <Label htmlFor="pet_id">ID Mascota</Label>
              <Input id="pet_id" {...register("pet_id")} />
              {errors.pet_id && (
                <span className="text-xs text-red-500">
                  {errors.pet_id.message}
                </span>
              )}
              <Label htmlFor="pet_name">Nombre Mascota</Label>
              <Input id="pet_name" {...register("pet_name")} />
              {errors.pet_name && (
                <span className="text-xs text-red-500">
                  {errors.pet_name.message}
                </span>
              )}
              <Label htmlFor="notes">Notas</Label>
              <Textarea id="notes" {...register("notes")} />
              <Label htmlFor="customer_id">ID Cliente</Label>
              <Input id="customer_id" {...register("customer_id")} />
              {errors.customer_id && (
                <span className="text-xs text-red-500">
                  {errors.customer_id.message}
                </span>
              )}
              <Label htmlFor="veterinarian_id">ID Veterinario</Label>
              <Input id="veterinarian_id" {...register("veterinarian_id")} />
              {errors.veterinarian_id && (
                <span className="text-xs text-red-500">
                  {errors.veterinarian_id.message}
                </span>
              )}
              <Label htmlFor="reason">Motivo</Label>
              <Input id="reason" {...register("reason")} />
              <Label htmlFor="status">Estado</Label>
              <select
                id="status"
                {...register("status")}
                className="w-full rounded-md border px-3 py-2"
              >
                <option value="pending">Pendiente</option>
                <option value="confirmed">Confirmada</option>
                <option value="cancelled">Cancelada</option>
              </select>
              {errors.status && (
                <span className="text-xs text-red-500">
                  {errors.status.message}
                </span>
              )}
              <Label htmlFor="service_ids">IDs de servicios (1,2)</Label>
              <Input id="service_ids" {...register("service_ids.0")} />
              <div className="flex gap-3 mt-4 justify-end">
                <Button type="submit" disabled={loading}>
                  Crear
                </Button>
                <Button type="button" variant="secondary" onClick={closeModal}>
                  Cancelar
                </Button>
              </div>
              {error && <div className="text-red-500 mt-2">{error}</div>}
              {result && (
                <pre className="bg-gray-100 rounded p-2 mt-2 text-xs">
                  {JSON.stringify(result, null, 2)}
                </pre>
              )}
            </form>
          </DialogContent>
        </Dialog>
        <Dialog open={modal === "update"} onOpenChange={closeModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Editar Reserva</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <Label htmlFor="reservationId">
                Buscar por ID o nombre de mascota
              </Label>
              <Input
                name="reservationId"
                value={reservationId}
                onChange={(e) => setReservationId(e.target.value)}
              />
              {reservationToEdit && (
                <div className="bg-blue-50 rounded p-2 mb-2 text-xs">
                  <b>Reserva encontrada:</b>
                  <br />
                  Cliente: {reservationToEdit.customer?.user?.name || "-"}
                  <br />
                  Mascota: {reservationToEdit.pet?.name || "-"}
                  <br />
                  Fecha: {reservationToEdit.date_time || "-"}
                  <br />
                  Estado: {reservationToEdit.status || "-"}
                  <br />
                  Notas: {reservationToEdit.notes || "-"}
                </div>
              )}
              <Label htmlFor="notes">Notas</Label>
              <Textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
              />
              <Label htmlFor="status">Estado</Label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2"
              >
                <option value="pending">Pendiente</option>
                <option value="confirmed">Confirmada</option>
                <option value="cancelled">Cancelada</option>
              </select>
              <div className="flex gap-3 mt-4 justify-end">
                <Button type="submit" disabled={loading}>
                  Actualizar
                </Button>
                <Button type="button" variant="secondary" onClick={closeModal}>
                  Cancelar
                </Button>
              </div>
              {error && <div className="text-red-500 mt-2">{error}</div>}
              {result && (
                <pre className="bg-gray-100 rounded p-2 mt-2 text-xs">
                  {JSON.stringify(result, null, 2)}
                </pre>
              )}
            </form>
          </DialogContent>
        </Dialog>
        <Dialog open={modal === "delete"} onOpenChange={closeModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Eliminar Reserva</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleDelete();
              }}
            >
              <Label htmlFor="reservationId">
                Buscar por ID o nombre de mascota
              </Label>
              <Input
                name="reservationId"
                value={reservationId}
                onChange={(e) => setReservationId(e.target.value)}
              />
              {reservationToEdit && (
                <div className="bg-blue-50 rounded p-2 mb-2 text-xs">
                  <b>Reserva encontrada:</b>
                  <br />
                  Cliente: {reservationToEdit.customer?.user?.name || "-"}
                  <br />
                  Mascota: {reservationToEdit.pet?.name || "-"}
                  <br />
                  Fecha: {reservationToEdit.date_time || "-"}
                  <br />
                  Estado: {reservationToEdit.status || "-"}
                  <br />
                  Notas: {reservationToEdit.notes || "-"}
                </div>
              )}
              <div className="flex gap-3 mt-4 justify-end">
                <Button type="submit" variant="destructive" disabled={loading}>
                  Eliminar
                </Button>
                <Button type="button" variant="secondary" onClick={closeModal}>
                  Cancelar
                </Button>
              </div>
              {error && <div className="text-red-500 mt-2">{error}</div>}
              {result && (
                <pre className="bg-gray-100 rounded p-2 mt-2 text-xs">
                  {JSON.stringify(result, null, 2)}
                </pre>
              )}
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default AdminReservationManager;
