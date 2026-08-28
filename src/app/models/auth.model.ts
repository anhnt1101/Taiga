export interface User {
  id?: number;
  username: string;
  role: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  roles: string[];
}
export interface RegisterData {
  username: string;
  password: string;
  email: string;
  role: string;
}

export interface RegisterResponse {
  accessToken: string;
  tokenType: string;
  username: string;
  roles: string[];
}