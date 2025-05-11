export function saveClienteToLocalStorage(
  cliente: { id: string; nombre: string; email: string; phone?: string; address?: string },
  token: string
) {
  localStorage.setItem("cliente_id", cliente.id);
  localStorage.setItem("cliente_nombre", cliente.nombre);
  localStorage.setItem("cliente_email", cliente.email);
  if (cliente.phone) localStorage.setItem("cliente_phone", cliente.phone);
  if (cliente.address) localStorage.setItem("cliente_address", cliente.address);
  localStorage.setItem("cliente_token", token);
}
