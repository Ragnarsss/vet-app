export const GET_PETS_BY_CUSTOMER = `
  query PetsByCustomer($customer_id: String!) {
    customer(id: $customer_id) {
      id
      pets {
        id
        name
        species
        breed
        age
        sex
        weight
        color
        marks
        birth_date
        notes
      }
    }
  }
`;

export const UPDATE_PET = `
  mutation UpdatePet($id: String!, $input: UpdatePetInput!) {
    updatePet(id: $id, input: $input) {
      id
      name
      species
      breed
      age
      sex
      weight
      color
      marks
      birth_date
      notes
    }
  }
`;

export const DELETE_PET = `
  mutation DeletePet($id: String!) {
    deletePet(id: $id) {
      id
      name
    }
  }
`;
