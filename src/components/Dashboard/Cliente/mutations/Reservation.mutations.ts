export const CREATE_RESERVATION_MUTATION = `
  mutation CreateReservation($customer_id: String!, $veterinarian_id: String!, $date_time: String!, $pet_id: String!, $pet_name: String!, $notes: String, $reason: String, $status: ReservationStatus!, $service_ids: [String!]) {
    createReservation(input: {
      customer_id: $customer_id,
      veterinarian_id: $veterinarian_id,
      date_time: $date_time,
      pet_id: $pet_id,
      pet_name: $pet_name,
      notes: $notes,
      reason: $reason,
      status: $status,
      service_ids: $service_ids
    }) {
      id
      date_time
      pet_id
      pet_name
      notes
      customer_id
      veterinarian_id
      reason
      status
      created_at
      updated_at
    }
  }
`;

export const CANCEL_RESERVATION_MUTATION = `
  mutation CancelReservation($reservation_id: String!) {
    cancelReservation(reservation_id: $reservation_id) {
      id
      date_time
      customer_id
      veterinarian_id
      status
    }
  }
`;
