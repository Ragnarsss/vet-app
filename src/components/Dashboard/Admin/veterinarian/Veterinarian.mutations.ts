import { gql } from "graphql-request";

export const CREATE_VETERINARIAN_MUTATION = gql`
  mutation CreateVeterinarian($user_id: String!, $phone: String) {
    createVeterinarian(input: { user_id: $user_id, phone: $phone }) {
      id
      phone
      user {
        id
        name
        email
      }
    }
  }
`;
