import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import {
  SPECIES_OPTIONS,
  BREED_OPTIONS,
  SEX_OPTIONS,
} from "@/constants/petOptions";
import { Pet } from "@/types/Pet";
import { useClientPets } from "./hooks/useClientPets";

type PetFormModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingPet: Pet | null;
  closeModal: () => void;
  customer_id: string;
  openCreateModal: () => void;
};

const PetFormModal: React.FC<PetFormModalProps> = ({
  open,
  onOpenChange,
  editingPet,
  closeModal,
  customer_id,
}) => {
  const [formError, setFormError] = React.useState("");
  const { createPet, updatePet } = useClientPets();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Omit<Pet, "id">>({
    defaultValues: editingPet
      ? { ...editingPet, customer_id }
      : {
          name: "",
          species: "",
          breed: "",
          age: undefined,
          sex: "",
          weight: undefined,
          color: "",
          marks: "",
          customer_id,
          birth_date: "",
          notes: "",
        },
  });

  React.useEffect(() => {
    if (open) {
      if (editingPet) {
        reset({ ...editingPet, customer_id });
      } else {
        reset({
          name: "",
          species: "",
          breed: "",
          age: undefined,
          sex: "",
          weight: undefined,
          color: "",
          marks: "",
          customer_id,
          birth_date: "",
          notes: "",
        });
      }
    }
  }, [open, editingPet, customer_id, reset]);

  const onSubmit = async (data: Omit<Pet, "id">) => {
    try {
      const formattedData = {
        ...data,
        age: data.age ? parseInt(data.age as unknown as string, 10) : undefined, // Convertir age a número
        weight: data.weight
          ? parseFloat(data.weight as unknown as string)
          : undefined, // Convertir weight a número
        birth_date: data.birth_date ? data.birth_date.split("T")[0] : undefined, // Convertir birth_date a formato YYYY-MM-DD
        customer_id,
      };

      if (editingPet) {
        await updatePet(editingPet.id!, formattedData);
      } else {
        await createPet(formattedData);
      }
      closeModal();
    } catch (e) {
      console.error("Error al guardar mascota", e);
      setFormError(
        "Ocurrió un error al guardar los datos. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingPet ? "Editar Mascota" : "Agregar Mascota"}
          </DialogTitle>
        </DialogHeader>
        {formError && <Alert variant="destructive">{formError}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                {...register("name", { required: true })}
                placeholder="Nombre"
                disabled={isSubmitting}
              />
              {errors.name && (
                <Alert variant="destructive">Nombre requerido</Alert>
              )}
            </div>
            <div>
              <Label htmlFor="species">Especie</Label>
              <Select
                value={watch("species") || ""}
                onValueChange={(value) => {
                  setValue("species", value);
                  setValue("breed", "");
                }}
                disabled={isSubmitting}
              >
                <SelectTrigger id="species">
                  <SelectValue placeholder="Selecciona especie" />
                </SelectTrigger>
                <SelectContent>
                  {SPECIES_OPTIONS.map((sp) => (
                    <SelectItem key={sp} value={sp}>
                      {sp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.species && (
                <Alert variant="destructive">Especie requerida</Alert>
              )}
            </div>
            <div>
              <Label htmlFor="breed">Raza</Label>
              <Select
                value={watch("breed") || ""}
                onValueChange={(value) => setValue("breed", value)}
                disabled={!watch("species") || isSubmitting}
              >
                <SelectTrigger id="breed">
                  <SelectValue placeholder="Selecciona raza" />
                </SelectTrigger>
                <SelectContent>
                  {(BREED_OPTIONS[watch("species")] || []).map((br) => (
                    <SelectItem key={br} value={br}>
                      {br}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="age">Edad</Label>
              <Input
                id="age"
                type="number"
                {...register("age")}
                placeholder="Edad"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="sex">Sexo</Label>
              <Select
                value={watch("sex") || ""}
                onValueChange={(value) => setValue("sex", value)}
                disabled={isSubmitting}
              >
                <SelectTrigger id="sex">
                  <SelectValue placeholder="Selecciona sexo" />
                </SelectTrigger>
                <SelectContent>
                  {SEX_OPTIONS.map((sx) => (
                    <SelectItem key={sx} value={sx}>
                      {sx}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="weight">Peso</Label>
              <Input
                id="weight"
                type="float"
                step="0.01"
                {...register("weight", { valueAsNumber: true })}
                placeholder="Peso"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                {...register("color")}
                placeholder="Color"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="marks">Marcas</Label>
              <Input
                id="marks"
                {...register("marks")}
                placeholder="Marcas"
                disabled={isSubmitting}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="birth_date">Fecha de nacimiento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    type="button"
                    className={
                      "w-full justify-start text-left font-normal " +
                      (!watch("birth_date") ? "text-muted-foreground" : "")
                    }
                    disabled={isSubmitting}
                  >
                    {watch("birth_date")
                      ? format(
                          new Date(watch("birth_date") || ""),
                          "yyyy-MM-dd"
                        )
                      : "Selecciona fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      watch("birth_date")
                        ? new Date(watch("birth_date") || "")
                        : undefined
                    }
                    onSelect={(date) =>
                      setValue("birth_date", date?.toISOString() || "")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="notes">Notas</Label>
              <Input
                id="notes"
                {...register("notes")}
                placeholder="Notas"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <DialogFooter style={{ marginTop: 16 }}>
            <Button type="submit" disabled={isSubmitting}>
              {editingPet ? "Guardar Cambios" : "Agregar"}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={closeModal}>
                Cancelar
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PetFormModal;
