export const CREATE_PRODUCT_MUTATION = `
  mutation CreateProduct($name: String!, $description: String!, $price: Int!) {
    createProduct(
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

export const UPDATE_PRODUCT_MUTATION = `
  mutation UpdateProduct($id: ID!, $name: String, $description: String, $price: Int) {
    updateProduct(id: $id, input: { name: $name, description: $description, price: $price }) {
      id
      name
      description
      price
    }
  }
`;

export const DELETE_PRODUCT_MUTATION = `
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;
