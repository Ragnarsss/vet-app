// src/components/Dashboard/Admin/pet/Pet.queries.ts
export const GET_CUSTOMER_ID_BY_EMAIL = `
  query GetCustomerIdByEmail($email: String!) {
    customerByEmail(email: $email) {
      id
    }
  }
`;

export const GET_PETS_BY_CUSTOMER = `
  query PetsByCustomer($id: ID!) {
    customer(id: $id) {
      pets {
        id
        name
        species
        breed
        age
      }
    }
  }
`;