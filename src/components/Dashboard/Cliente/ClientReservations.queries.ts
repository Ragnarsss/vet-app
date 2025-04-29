export const RESERVAS_POR_CLIENTE_QUERY = `
  query ReservasPorCliente($cliente_id: Int!) {
    reservasPorCliente(cliente_id: $cliente_id) {
      id
      horario
      mascota_nombre
      estado
      observaciones
    }
  }
`;
