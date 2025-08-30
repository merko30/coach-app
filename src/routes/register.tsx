import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { UserPlus } from "lucide-react";
import { useState } from "react";
import { z, ZodError } from "zod";
import { useMutation } from "@tanstack/react-query";

const schema = z
  .object({
    username: z.string().min(6, "Username must contain at least 6 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must contain at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must contain at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

async function registerUser(data: any) {
  const res = await fetch("http://localhost:8000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration failed");
  }

  return res.json();
}

type Errors = {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
};

const Register = () => {
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();
  const {
    mutate,
    error,
    isPending: loading,
  } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => navigate({ to: "/login" }),
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get("username")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
      confirmPassword: formData.get("confirmPassword")?.toString() || "",
      is_coach: false,
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
      <Card className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden shadow-lg border border-border">
        {/* Left panel: Branding/Features */}
        <div className="hidden md:flex flex-col justify-center items-center bg-primary text-primary-foreground px-10 py-12 w-1/2">
          <UserPlus className="w-16 h-16 mb-6" />
          <h2 className="text-3xl font-bold mb-4">Join CoachingApp</h2>
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
                htmlFor="username"
                className="mb-1 block text-sm font-medium text-muted-foreground"
              >
                Username
              </Label>
              <Input
                name="username"
                id="username"
                className="w-full"
                autoComplete="username"
              />
              {errors.username && (
                <p className="text-destructive text-sm mt-1">
                  {errors.username}
                </p>
              )}
            </div>
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
            <div>
              <Label
                htmlFor="confirmPassword"
                className="mb-1 block text-sm font-medium text-muted-foreground"
              >
                Confirm Password
              </Label>
              <Input
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                className="w-full"
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <p className="text-destructive text-sm mt-1">
                  {errors.confirmPassword}
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
              {loading ? "Signing up..." : "Sign up"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary underline hover:text-secondary"
            >
              Log in
            </a>
          </p>
        </div>
      </Card>
    </main>
  );
};

export const Route = createFileRoute("/register")({
  component: Register,
});
