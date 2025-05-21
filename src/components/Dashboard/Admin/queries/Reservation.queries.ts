export const ALL_RESERVATIONS_QUERY = `
  query AllReservations {
    reservations {
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
      pet {
        id
        name
      }
    }
  }
`;

export const RESERVATION_BY_ID_QUERY = `
  query ReservationById($id: String!) {
    reservation(id: $id) {
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
      pet {
        id
        name
      }
      created_at
      updated_at
    }
  }
`;

export const RESERVATIONS_BY_CUSTOMER_QUERY = `
  query ReservationsByCustomer($customer_id: String!) {
    reservationsByCustomer(customer_id: $customer_id) {
      id
      date_time
      veterinarian {
        id
        user {
          name
        }
      }
      pet {
        id
        name
      }
    }
  }
`;

export const RESERVATIONS_BY_VETERINARIAN_QUERY = `
  query ReservationsByVeterinarian($veterinarian_id: String!) {
    reservationsByVeterinarian(veterinarian_id: $veterinarian_id) {
      id
      date_time
      customer {
        id
        user {
          name
        }
      }
      pet {
        id
        name
      }
    }
  }
`;

export const PAGINATED_RESERVATIONS_QUERY = `
  query PaginatedReservations {
    paginatedReservations {
      id
      date_time
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
      pet {
        id
        name
      }
    }
  }
`;
