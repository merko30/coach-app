import { type NavigateFn } from "@tanstack/react-router";
import { AuthProviderSkeleton } from "@/components/AuthProviderSkeleton";
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
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
        const res = await fetch("http://localhost:8000/auth/me", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await res.json();
        console.log(res);

        setUser(json);
        setLoggedIn(res.ok);
      } catch {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const logout = (navigate: NavigateFn) =>
    fetch("http://localhost:8000/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      navigate({ to: "/login" });
      setLoggedIn(false);
      setUser(null);
    });

  const login = async (data: Login) => {
    const res = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Registration failed");
    }

    const json = await res.json();

    setUser(json);
    setLoggedIn(true);
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
