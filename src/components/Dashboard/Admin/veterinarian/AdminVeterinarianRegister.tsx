import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateVeterinarian } from "./useCreateVeterinarian";

const vetSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  phone: z.string().optional(),
});

type VetFormInputs = z.infer<typeof vetSchema>;

const AdminVeterinarianRegister: React.FC = () => {
  const { registerVeterinarian, loading, error } = useCreateVeterinarian();
  const [result, setResult] = useState<any>(null);
  const form = useForm<VetFormInputs>({
    resolver: zodResolver(vetSchema),
    defaultValues: { name: "", email: "", password: "", phone: "" },
  });

  const onSubmit = async (data: VetFormInputs) => {
    setResult(null);
    console.log(
      "[AdminVeterinarianRegister] Iniciando registro de veterinario",
      data
    );

    // Usando el hook unificado que maneja todo el proceso
    const res = await registerVeterinarian({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
    });

    console.log("[AdminVeterinarianRegister] Resultado del registro:", res);
    setResult(res);

    if (res) {
      form.reset();
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Registrar Veterinario</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registrando..." : "Registrar Veterinario"}
            </Button>
            {error && (
              <Alert variant="destructive" className="mt-2">
                {error}
              </Alert>
            )}
            {result && !error && (
              <Alert variant="default" className="mt-2">
                ¡Veterinario registrado!
              </Alert>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AdminVeterinarianRegister;
