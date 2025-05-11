import { gql } from "graphql-request";

export const GET_SERVICES = gql`
  query AllServices {
    services {
      id
      name
      description
      price
    }
  }
`;