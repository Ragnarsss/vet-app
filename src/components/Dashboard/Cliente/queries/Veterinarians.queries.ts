export const GET_VETERINARIANS_QUERY = `
  query Veterinarians {
    veterinarians {
      id
      phone
      availability
      user { id name }
    }
  }
`;
