import { gql } from "graphql-request";

export const GET_SERVICES = gql`
  query GetServices {
    services {
      id
      name
      description
      price
    }
  }
`;