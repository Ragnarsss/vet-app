export const REGISTER_MUTATION = `
  mutation RegisterCliente($nombre: String!, $email: String!, $password: String!, $telefono: String!, $direccion: String!) {
    registerCliente(input: {
      nombre: $nombre,
      email: $email,
      password: $password,
      telefono: $telefono,
      direccion: $direccion,
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

export const REGISTER_USER_MUTATION = `
  mutation RegisterUser(
    $name: String!
    $email: String!
    $password: String!
    $phone: String!
    $address: String!
  ) {
    registerUser(
      input: {
        name: $name
        email: $email
        password: $password
        phone: $phone
        address: $address
      }
    ) {
      id
      phone
      address
      user {
        id
        name
        email
      }
      reservations {
        id
        date_time
      }
      pets {
        id
        name
      }
      careOrders {
        id
        status
        total
      }
    }
  }
`;
