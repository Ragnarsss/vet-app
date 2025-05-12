import { gql } from "graphql-request";

export const LOGIN_VETERINARIAN_MUTATION = gql`
  mutation LoginVeterinarian($email: String!, $password: String!) {
    loginVeterinarian(input: { email: $email, password: $password }) {
      message
      user {
        id
        name
        email
      }
      data {
        auth_token
        refresh_token
      }
    }
  }
`;
