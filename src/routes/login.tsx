import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { UserPlus } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthProvider";

const schema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

type Errors = {
  email?: string;
  password?: string;
};

const Login = () => {
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    mutate,
    error,
    isPending: loading,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => navigate({ to: "/dashboard" }),
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };
    const result = schema.safeParse(data);
    if (!result.success) {
      const fieldErrors: any = {};
      for (const err of result.error.issues) {
        fieldErrors[err.path[0]] = err.message;
      }
      setErrors(fieldErrors);
      return;
    }
    return mutate(data);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden shadow-lg border border-border py-0">
        {/* Left panel: Branding/Features */}
        <div className="hidden md:flex flex-col justify-center items-center bg-primary text-primary-foreground px-10 py-12 w-1/2">
          <UserPlus className="w-16 h-16 mb-6" />
          <h2 className="text-3xl font-bold mb-4">Welcome back</h2>
          <p className="text-lg mb-8 text-primary-foreground/80 text-center">
            Unlock your potential with personalized coaching, progress tracking,
            and a supportive community.
          </p>
          <ul className="space-y-3 text-left w-full max-w-xs mx-auto">
            <li className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>{" "}
              1-on-1 Coaching
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>{" "}
              Progress Dashboard
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>{" "}
              Community Support
            </li>
          </ul>
        </div>
        {/* Right panel: Form */}
        <div className="flex-1 flex flex-col justify-center px-6 py-10 bg-card">
          <h1 className="text-2xl font-bold text-primary mb-6 text-center md:text-left">
            Create your account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-muted-foreground"
              >
                Email
              </Label>
              <Input
                name="email"
                id="email"
                type="email"
                className="w-full"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <Label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-muted-foreground"
              >
                Password
              </Label>
              <Input
                name="password"
                id="password"
                type="password"
                className="w-full"
                autoComplete="new-password"
              />
              {errors.password && (
                <p className="text-destructive text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>
            {error && (
              <p className="text-destructive text-sm mt-2 text-center">
                {error.message}
              </p>
            )}
            <Button
              type="submit"
              size="lg"
              className="w-full mt-2 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-primary underline hover:text-secondary"
            >
              Sign up
            </a>
          </p>
        </div>
      </Card>
    </main>
  );
};

export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad: ({ context }) => {
    // Redirect if already authenticated
    if (context.auth?.loggedIn) {
      throw redirect({ to: "/dashboard" });
    }
  },
});
