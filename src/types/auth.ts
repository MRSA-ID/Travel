import { Users } from "@/types/users";

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
  user: Users;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export type GenericErrorResponse = {
  message: string;
  errors: Record<string, string> | null;
};
