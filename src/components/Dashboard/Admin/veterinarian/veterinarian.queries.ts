export const GET_VETERINARIANS_DETAILED = `
  query AllVeterinariansDetailed {
    veterinarians {
      id
      phone
      user { id name email }
      reservations { id date_time }
      pets { id name }
      careOrders { id status total }
    }
  }
`;
