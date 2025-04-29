export const VETERINARIO_MASCOTAS_QUERY = `
  query Mascotas {
    mascotas {
      id
      nombre
      clienteId
    }
  }
`;

export const VETERINARIO_CLIENTES_QUERY = `
  query Clientes {
    clientes {
      id
      nombre
    }
  }
`;

export const VETERINARIO_RESERVAS_QUERY = `
  query Reservas {
    reservas {
      id
      mascotaId
      clienteId
      estado
    }
  }
`;
