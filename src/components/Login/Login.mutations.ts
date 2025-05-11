export const LOGIN_MUTATION = `
  mutation loginCliente($email: String!, $password: String!) {
    loginCliente(input: {
      email: $email,
      password: $password
    }) {
      access_token
      expires_in
      cliente {
        id
        nombre
      }
    }
  }
`;

export const LOGIN_USER_MUTATION = `
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password }) {
      message
      user {
        id
        name
        email
      }
      customer {
        id
        phone
        address
      }
      data {
        auth_token
        refresh_token
      }
    }
  }
`;
