export type Veterinarian = {
  id: string;
  phone: string;
  availability?: string;
  user_id: string;
  name: string;
  specialty?: string;
};

export type Reservation = {
  id: string;
  date: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  pet?: { id: string; name: string };
  customer?: { id: string; user: { id: string; name: string } };
  veterinarian?: Veterinarian;
};
