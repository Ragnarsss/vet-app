import { Customer } from "./Customer";
import { Veterinarian } from "./Veterinarian";

export interface User {
  id: string;
  name: string;
  email: string;
  customer?: Customer;
  veterinarian?: Veterinarian;
}
