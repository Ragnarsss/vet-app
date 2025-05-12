import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { useAdminVeterinarianMutations } from "./useAdminVeterinarianMutations";

const vetSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  phone: z.string().optional(),
  availability: z.array(z.string()).min(1, "Selecciona al menos un día"),
});

type VetFormInputs = z.infer<typeof vetSchema>;

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

const AdminVeterinarianRegister: React.FC = () => {
  const { createUser, createVeterinarian, loading, error } =
    useAdminVeterinarianMutations();
  const [result, setResult] = useState<any>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<VetFormInputs>({
    resolver: zodResolver(vetSchema),
    defaultValues: { availability: [] },
  });

  const onSubmit = async (form: VetFormInputs) => {
    setResult(null);
    const userRes = await createUser({
      name: form.name,
      email: form.email,
      password: form.password,
    });
    if (!userRes || !userRes.id) {
      setResult({ error: "Error al crear usuario" });
      return;
    }
    const vetInput = {
      user_id: userRes.id,
      phone: form.phone,
      availability: form.availability,
    };
    const res = await createVeterinarian(vetInput);
    setResult(res);
    reset();
  };

  const selectedAvailability = watch("availability");

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Registrar Veterinario</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" {...register("name")} disabled={loading} />
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              disabled={loading}
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              disabled={loading}
            />
            {errors.password && (
              <span className="text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" {...register("phone")} disabled={loading} />
            {errors.phone && (
              <span className="text-xs text-red-500">
                {errors.phone.message}
              </span>
            )}
          </div>
          <div>
            <Label>Disponibilidad (elige los días)</Label>
            <div className="flex flex-wrap gap-3 mt-2">
              {DIAS.map((dia) => (
                <label key={dia} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    value={dia}
                    checked={selectedAvailability.includes(dia)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setValue(
                        "availability",
                        checked
                          ? [...selectedAvailability, dia]
                          : selectedAvailability.filter((d) => d !== dia)
                      );
                    }}
                    disabled={loading}
                  />
                  {dia}
                </label>
              ))}
            </div>
            {errors.availability && (
              <span className="text-xs text-red-500">
                {errors.availability.message as string}
              </span>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Registrando..." : "Registrar Veterinario"}
          </Button>
          {error && (
            <Alert variant="destructive" className="mt-2">
              {error}
            </Alert>
          )}
          {result && !error && (
            <Alert variant="success" className="mt-2">
              ¡Veterinario registrado!
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminVeterinarianRegister;
