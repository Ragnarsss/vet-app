import { gql } from "graphql-request";

export const PRODUCTOS_QUERY = gql`
  query GetProductos {
    productos {
      id
      name
      description
      price
    }
  }
`;