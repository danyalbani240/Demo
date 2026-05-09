import type { Provider } from ".";

// types/api.ts
export interface ApiResult<T> {
  success: boolean;
  data: T | null;
  message?: string;
  errors?: Record<string, string[]>; // For validation details
}

export interface AuthResponse {
  user: Provider | null;
  next?: string;
  needsOtp?: boolean;
  phone?: string;
  purpose?: string;
}
export interface SignUpPayload {
  full_name: string;
  phone: string;
  password: string;
  role: "user" | "provider";
}
export interface OtpPayload {
  phone: string;
  code: string;
  purpose: "login" | "signup";
}
