export const GET_RESERVATIONS = `
  query ReservationsByVeterinarian($veterinarian_id: String!) {
    reservationsByVeterinarian(veterinarian_id: $veterinarian_id) {
      id
      date_time
      status
      notes
      reason
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
    }
  }
`;

export const UPDATE_RESERVATION_STATUS = `
  mutation UpdateReservationStatus($id: String!, $status: ReservationStatus!) {
    updateReservationStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

export const COMPLETE_ORDER = `
  mutation CompleteOrder($reservationId: String!, $products: [ProductOrderInput!], $service_ids: [ID!]) {
    completeOrder(reservationId: $reservationId, products: $products, service_ids: $service_ids) {
      id
      status
      total
      products {
        id
        name
        price
      }
      reservation {
        id
        date_time
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

export const GET_SERVICES = `
  query Services {
    services {
      id
      name
      price
    }
  }
`;

export const GET_PRODUCTS = `
  query Products {
    products {
      id
      name
      price
    }
  }
`;

export const GET_CARE_ORDERS = `
  query CareOrdersByVeterinarian($veterinarian_id: String!) {
    careOrdersByVeterinarian(veterinarian_id: $veterinarian_id) {
      id
      status
      total
      created_at
      products {
        id
        name
        price
      }
      reservation {
        id
        date_time
        status
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
