export const LOGIN_VETERINARIAN_MUTATION = `
  mutation LoginVeterinarian($input: LoginVeterinarianInput!) {
    loginVeterinarian(input: $input) {
      message
      user {
        id
        name
        email
      }
      veterinarian {
        id
        phone
      }
      data {
        auth_token
        refresh_token
      }
    }
  }
`;
