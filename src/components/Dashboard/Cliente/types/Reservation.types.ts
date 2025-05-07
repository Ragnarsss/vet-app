// Tipos para la vista del historial de reservas
export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "canceled"
  | "completed";

export interface User {
  id: string;
  name: string;
}

export interface Customer {
  id: string;
  phone?: string;
  address?: string;
  user: User;
  reservations: Reservation[];
  pets: Pet[];
  careOrders: CareOrder[];
}

export interface Veterinarian {
  id: string;
  phone?: string;
  availability: string[];
  user: User;
  reservations: Reservation[];
  pets: Pet[];
  careOrders: CareOrder[];
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed?: string;
  age?: number;
  sex?: string;
  weight?: number;
  color?: string;
  marks?: string;
  customer: Customer;
  reservations: Reservation[];
  careOrders: CareOrder[];
  birth_date?: string;
  notes?: string;
}

export interface Service {
  id: string;
  name: string;
}

export interface CareOrder {
  id: string;
  description?: string;
}

export interface Reservation {
  id: string;
  date_time: string;
  pet_id: string;
  pet_name: string;
  notes?: string;
  customer_id: string;
  veterinarian_id: string;
  reason?: string;
  status: ReservationStatus;
  customer?: Customer;
  veterinarian?: Veterinarian;
  pet?: Pet;
  services?: Service[];
  careOrder?: CareOrder;
  created_at?: string;
  updated_at?: string;
}

export interface CreateReservationInput {
  date_time: string;
  pet_id: string;
  pet_name: string;
  notes?: string;
  customer_id: string;
  veterinarian_id: string;
  reason?: string;
  status: ReservationStatus;
  service_ids?: string[];
}
