export const CREATE_RESERVATION_MUTATION = `
  mutation CreateReservation($date_time: String!, $pet_id: ID!, $pet_name: String!, $notes: String, $customer_id: ID!, $veterinarian_id: ID!, $reason: String!, $status: String!, $service_ids: [ID!]) {
    createReservation(
      input: {
        date_time: $date_time
        pet_id: $pet_id
        pet_name: $pet_name
        notes: $notes
        customer_id: $customer_id
        veterinarian_id: $veterinarian_id
        reason: $reason
        status: $status
        service_ids: $service_ids
      }
    ) {
      id
      date_time
      pet_id
      pet_name
      notes
      customer_id
      veterinarian_id
      reason
      status
      services {
        id
        name
        price
      }
      pet {
        id
        name
      }
      customer {
        id
        user {
          name
        }
      }
      veterinarian {
        id
        user {
          name
        }
      }
    }
  }
`;

export const UPDATE_RESERVATION_MUTATION = `
  mutation UpdateReservation($id: ID!, $notes: String, $status: String) {
    updateReservation(id: $id, input: { notes: $notes, status: $status }) {
      id
      notes
      status
    }
  }
`;

export const DELETE_RESERVATION_MUTATION = `
  mutation DeleteReservation($id: ID!) {
    deleteReservation(id: $id) {
      id
      status
    }
  }
`;
