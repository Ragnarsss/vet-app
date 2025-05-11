export const CREATE_PET_MUTATION = `
  mutation CreatePetInput(
    $name: String!,
    $species: String!,
    $breed: String!,
    $age: Int!,
    $customer_id: ID!,
    $sex: String,
    $weight: Float,
    $color: String,
    $marks: String,
    $birth_date: String,
    $notes: String
  ) {
    createPet(
      input: {
        name: $name
        species: $species
        breed: $breed
        age: $age
        customer_id: $customer_id
        sex: $sex
        weight: $weight
        color: $color
        marks: $marks
        birth_date: $birth_date
        notes: $notes
      }
    ) {
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
export const CREATE_SIMPLE_PET_MUTATION = `
  mutation CreateSimplePet(
    $name: String!,
    $species: String!,
    $breed: String!,
    $age: Int!,
    $customer_id: ID!
  ) {
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