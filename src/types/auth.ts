import { User } from "./user";

export interface JWTData {
  token: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegistrationRequest extends User, LoginRequest {
  passwordConfirm: string;
}

export interface AuthResult extends JWTData {
  user?: User;
  code: number;
}
