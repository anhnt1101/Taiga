export interface User {
  id: string;
  username: string;
  fullName: string;
  role: string;
  email: string;
  avatarInitials: string;
  department: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  fullName: string;
  username: string;
  email: string;
  phone?: string;
  department: string;
  role: string;
  password: string;
  confirmPassword?: string;
  acceptTerms: boolean;
}
