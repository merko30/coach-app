import { type NavigateFn } from "@tanstack/react-router";
import { AuthProviderSkeleton } from "@/components/AuthProviderSkeleton";
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import authService from "@/services/auth";

interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  plans: any[];
}

interface Login {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User;
  loggedIn: boolean;
  loading: boolean;
  logout: (callback: any) => Promise<void>;
  login: (data: Login) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      setLoading(true);
      try {
        const response = await authService.getUser();
        const data = response.data;

        setUser(data);
        setLoggedIn(true);
      } catch {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    // refresh every 10 minutes
    const interval = setInterval(
      () => {
        authService.refresh().catch(() => console.log("refresh failed"));
      },
      10 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, []);

  const logout = (navigate: NavigateFn) =>
    authService.logout().then(() => {
      navigate({ to: "/login" });
      setLoggedIn(false);
      setUser(null);
    });

  const login = async (data: Login) => {
    try {
      const response = await authService.login(data);
      const user = response.data;

      setUser(user);
      setLoggedIn(true);
    } catch (error: any) {
      throw new Error(
        error?.response?.data.detail.message ?? "Registration failed"
      );
    }
  };

  if (loading) {
    return <AuthProviderSkeleton />;
  }

  return (
    <AuthContext.Provider value={{ user, loggedIn, loading, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
