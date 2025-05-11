// Listado de especies de mascotas
export const SPECIES_OPTIONS = [
  "Perro",
  "Gato",
  "Ave",
  "Conejo",
  "Reptil",
  "Roedor",
  "Pez",
  "Otro",
];

// Opciones de sexo para mascotas
export const SEX_OPTIONS = ["Macho", "Hembra", "Desconocido"];

// Razas agrupadas por especie
export const BREED_OPTIONS: Record<string, string[]> = {
  Perro: [
    "Labrador Retriever",
    "Poodle",
    "Bulldog",
    "Pastor Alemán",
    "Golden Retriever",
    "Chihuahua",
    "Beagle",
    "Boxer",
    "Dálmata",
    "Otro",
  ],
  Gato: [
    "Siames",
    "Persa",
    "Maine Coon",
    "Bengal",
    "Sphynx",
    "Ragdoll",
    "British Shorthair",
    "Otro",
  ],
  Ave: [
    "Canario",
    "Periquito",
    "Cacatúa",
    "Loro",
    "Agapornis",
    "Diamante Mandarín",
    "Otro",
  ],
  Conejo: ["Enano", "Cabeza de León", "Rex", "Belier", "Angora", "Otro"],
  Reptil: ["Iguana", "Tortuga", "Serpiente", "Camaleón", "Gecko", "Otro"],
  Roedor: ["Hámster", "Cobaya", "Chinchilla", "Rata", "Ratón", "Otro"],
  Pez: ["Betta", "Goldfish", "Guppy", "Molly", "Tetra", "Otro"],
  Otro: ["Otro"],
};
