export const CREATE_PET_MUTATION = `
  mutation CreatePet($name: String!, $species: String!, $breed: String!, $age: Int!, $customer_id: ID!) {
    createPet(
      input: {
        name: $name
        species: $species
        breed: $breed
        age: $age
        customer_id: $customer_id
      }
    ) {
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

export const UPDATE_PET_MUTATION = `
  mutation UpdatePet($id: ID!, $name: String, $species: String, $breed: String, $age: Int) {
    updatePet(id: $id, input: { name: $name, species: $species, breed: $breed, age: $age }) {
      id
      name
      age
    }
  }
`;

export const DELETE_PET_MUTATION = `
  mutation DeletePet($id: ID!) {
    deletePet(id: $id) {
      id
      name
    }
  }
`;
