import { Pet } from "./Pet";
import { Reservation } from "./Reservation";
import { CareOrder } from "./CareOrder";

export interface ClienteUser {
  id: string;
  name: string;
  email: string;
}

export interface Cliente {
  id: string;
  phone?: string;
  address?: string;
  user: ClienteUser;
  pets?: Pet[];
  reservations?: Reservation[];
  careOrders?: CareOrder[];
  access_token?: string;
}
