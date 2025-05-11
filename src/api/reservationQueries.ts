export async function fetchReservations({
  petId,
  clientId,
}: {
  petId?: string | null;
  clientId?: string | null;
}) {
  const response = await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query Reservations($petId: ID, $clientId: ID) {
          reservations(petId: $petId, clientId: $clientId) {
            id
            date
            status
            pet { id name }
            client { id name }
          }
        }
      `,
      variables: { petId, clientId },
    }),
  });
  const result = await response.json();
  return result.data.reservations;
}
