export const GET_VETERINARIANS_QUERY = `
  query AllVeterinarians {
    veterinarians {
      id
      phone
      user {
        id
        name
        email
      }
      reservations {
        id
        date_time
      }
      careOrders {
        id
        status
        total
      }
    }
  }
`;
