// Respuesta estándar de la API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// Respuesta con conteo (listas)
export interface ApiListResponse<T> {
  success: boolean;
  count: number;
  data: T[];
}

// Respuesta de error
export interface ApiError {
  success: false;
  error?: string | string[];
  errors?: ValidationError[];
}

export interface ValidationError {
  msg: string;
  param: string;
  location: string;
}
