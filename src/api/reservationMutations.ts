export async function updateReservationStatus({
  reservation_id,
  status,
}: {
  reservation_id: string;
  status: string;
}) {
  const response = await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation UpdateReservationStatus($reservation_id: ID!, $status: String!) {
          updateReservationStatus(reservation_id: $reservation_id, status: $status) {
            id
            status
          }
        }
      `,
      variables: { reservation_id, status },
    }),
  });
  const result = await response.json();
  return result.data.updateReservationStatus;
}
