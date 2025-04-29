export const CREAR_APPOINTMENT_MUTATION = `
  mutation CrearReserva($cliente_id: Int!, $veterinario_id: Int!, $horario: String!) {
    crearReserva(cliente_id: $cliente_id, veterinario_id: $veterinario_id, horario: $horario) {
      id
      horario
      cliente { id nombre }
      veterinario { id nombre }
    }
  }
`;

export const CANCELAR_RESERVA_MUTATION = `
  mutation CancelarReserva($reserva_id: Int!) {
    cancelarReserva(reserva_id: $reserva_id) {
      id
      horario
      cliente { id nombre }
      veterinario { id nombre }
    }
  }
`;
