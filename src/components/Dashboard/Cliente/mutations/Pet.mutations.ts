export const CREATE_PET_MUTATION = `
  mutation CreatePet($input: CreatePetInput!) {
    createPet(input: $input) {
      id
      name
      species
      breed
      age
      customer {
        id
        user {
          name
        }
      }
    }
  }
`;
