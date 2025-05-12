export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  password?: string;
}

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface RegisterCustomerInput {
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface CreateVeterinarianInput {
  user: CreateUserInput;
  phone?: string;
  availability?: string[];
}

export interface UpdateVeterinarianInput {
  phone?: string;
  availability?: string[];
  user_id?: string;
}

export interface UpdateCustomerInput {
  phone?: string;
  address?: string;
  user_id?: string;
}

export interface CreatePetInput {
  name: string;
  species: string;
  breed?: string;
  age?: number;
  customer_id: string;
}

export interface UpdatePetInput {
  name?: string;
  species?: string;
  breed?: string;
  age?: number;
}

export interface CreateReservationInput {
  date_time: string;
  pet_id: string;
  pet_name: string;
  notes?: string;
  customer_id: string;
  veterinarian_id: string;
  reason?: string;
  status: string;
  service_ids: string[];
}

export interface UpdateReservationInput {
  date_time?: string;
  pet_id?: string;
  pet_name?: string;
  notes?: string;
  customer_id?: string;
  veterinarian_id?: string;
  reason?: string;
  status?: string;
}

export interface CreateServiceInput {
  name: string;
  description?: string;
  price: number;
}

export interface UpdateServiceInput {
  name?: string;
  description?: string;
  price?: number;
}

export interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
}

export interface ProductOrderInput {
  product_id: string;
  quantity: number;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface CompleteOrderInput {
  reservationId: string;
  products?: ProductOrderInput[];
  service_ids: string[];
}
