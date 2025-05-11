export const CREATE_SERVICE_MUTATION = `
  mutation CreateService($name: String!, $description: String!, $price: Int!) {
    createService(
      input: {
        name: $name
        description: $description
        price: $price
      }
    ) {
      id
      name
      description
      price
    }
  }
`;

export const UPDATE_SERVICE_MUTATION = `
  mutation UpdateService($id: ID!, $name: String, $description: String, $price: Int) {
    updateService(id: $id, input: { name: $name, description: $description, price: $price }) {
      id
      name
      description
      price
    }
  }
`;

export const DELETE_SERVICE_MUTATION = `
  mutation DeleteService($id: ID!) {
    deleteService(id: $id) {
      id
      name
    }
  }
`;
