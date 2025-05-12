import { Pet } from "./Pet";
import { Reservation } from "./Reservation";
import { CareOrder } from "./CareOrder";
import { User } from "./User";

export interface Veterinarian {
  id: string;
  phone?: string;
  availability?: string[];
  user?: User;
  reservations?: Reservation[];
  pets?: Pet[];
  careOrders?: CareOrder[];
}

export interface VeterinarianAuthData {
  auth_token: string;
  refresh_token: string;
}
