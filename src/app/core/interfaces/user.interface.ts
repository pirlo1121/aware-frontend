export type UserRole = 'user' | 'admin';

// Usuario retornado en respuestas de autenticación
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Perfil completo del usuario (GET /api/auth/profile)
export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

// Payload del login
export interface LoginPayload {
  email: string;
  password: string;
}

// Payload del registro
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

// Respuesta de autenticación (login / register)
export interface AuthResponse {
  success: boolean;
  token: string;
  user: AuthUser;
}
