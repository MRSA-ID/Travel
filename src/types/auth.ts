import { Users } from "@/types/users";

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  jwt: string;
  user: Users;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}
