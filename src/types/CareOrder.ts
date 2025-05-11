export interface CareOrder {
  id?: string;
  reservation_id: string;
  customer_id: string;
  veterinarian_id?: string;
  total: number;
  status: string;
}
