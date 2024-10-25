import $http from "@/api";
import { Users } from "@/types/users";
import { LoginRequest, RegisterRequest } from "@/types/auth";

function submitLogin(request: LoginRequest) {
  return $http.post("/api/auth/local", request);
}

function submitRegister(request: RegisterRequest) {
  return $http.post("/api/auth/local/register", request);
}

function getProfile() {
  return $http.get<{ data: Users }>("/api/users/me");
}

export { submitLogin, getProfile, submitRegister };
