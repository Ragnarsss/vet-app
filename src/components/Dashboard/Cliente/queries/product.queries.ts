import { gql } from "graphql-request";

export const PRODUCTOS_QUERY = gql`
  query AllProducts {
    products {
      id
      name
      description
      price
    }
  }
`;