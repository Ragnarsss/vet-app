import { gql } from "graphql-request";

export const CREATE_VETERINARIAN_MUTATION = gql`
  mutation CreateVeterinarian($user_id: String, $phone: String, $availability: [String!]) {
    createVeterinarian(input: {
      user_id: $user_id
      phone: $phone
      availability: $availability
    }) {
      id
      phone
      availability
      user {
        id
        name
        email
      }
    }
  }
`;
