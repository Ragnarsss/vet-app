export const UPDATE_RESERVATION_STATUS = `
mutation UpdateReservationStatus($id: String!, $status: ReservationStatus!) {
  updateReservationStatus(id: $id, status: $status) {
    id
    status
  }
}`;

export const CREATE_CARE_ORDER = `
mutation CreateCareOrder($input: CreateCareOrderInput!) {
  createCareOrder(input: $input) {
    id
    notes
  }
}`;
