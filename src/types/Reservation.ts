export interface Reservation {
  id?: string;
  date_time: string;
  pet_id: string;
  pet_name?: string;
  notes?: string;
  customer_id: string;
  veterinarian_id?: string;
  reason?: string;
  status?: string;
}
