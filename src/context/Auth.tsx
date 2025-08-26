// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { redirect } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

type AuthContextType = {
  user: any;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        setUser(session?.user || null);
      }
    });

    fetchUser();
    return () => data.subscription.unsubscribe();
  }, []);

  const signOut = () => {
    supabase.auth.signOut();
    redirect("/");
  };

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
