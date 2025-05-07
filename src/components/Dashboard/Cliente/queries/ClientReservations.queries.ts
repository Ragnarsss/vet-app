export const GET_CLIENT_RESERVATIONS_QUERY = `
  query ReservasPorCliente($cliente_id: String!) {
    reservasPorCliente(cliente_id: $cliente_id) {
      id
      horario
      mascota_nombre
      estado
      observaciones
    }
  }
`;
