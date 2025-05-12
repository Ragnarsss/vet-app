import { Pet } from "./Pet";
import { Reservation } from "./Reservation";
import { CareOrder } from "./CareOrder";
import { User } from "./User";

export interface Customer {
  id: string;
  phone?: string;
  address?: string;
  user: User;
  pets?: Pet[];
  reservations?: Reservation[];
  careOrders?: CareOrder[];
  access_token?: string;
}
