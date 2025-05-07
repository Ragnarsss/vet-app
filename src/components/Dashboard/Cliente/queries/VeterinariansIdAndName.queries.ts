export const GET_VETERINARIANS_ID_AND_NAME_QUERY = `
  query VeterinariansIdAndName {
    veterinarians {
      id
      user {
        name
      }
    }
  }
`;
