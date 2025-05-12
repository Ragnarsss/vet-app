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
