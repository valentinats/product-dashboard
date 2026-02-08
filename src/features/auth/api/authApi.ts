import { apiClient } from "@/shared/lib/api";
import type {
  LoginCredentials,
  AuthResponse,
} from "@/features/auth/types/auth.types";

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>("/auth/login", {
      ...credentials,
      expiresInMins: 30,
    });
  },
};
