import type { User } from "@/features/auth/types/auth.types";

export const saveToken = (token: string, remember: boolean): void => {
  if (remember) {
    localStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("token", token);
  }
};

export const getToken = (): string | null => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

export const removeToken = (): void => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
};

export const saveUser = (user: User, remember: boolean): void => {
  const userStr = JSON.stringify(user);
  if (remember) {
    localStorage.setItem("user", userStr);
  } else {
    sessionStorage.setItem("user", userStr);
  }
};

export const getUser = (): User | null => {
  const userStr =
    localStorage.getItem("user") || sessionStorage.getItem("user");
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

export const removeUser = (): void => {
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
};
