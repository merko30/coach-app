import { useState } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import authService from "@/services/auth";

const schema = z.object({
  email: z.email("Invalid email address"),
});

type Errors = {
  email?: string;
};

const ForgotPassword = () => {
  const [errors, setErrors] = useState<Errors>({});
  const {
    mutate,
    error,
    isPending: loading,
  } = useMutation({
    mutationFn: authService.requestPasswordChange,
    onSuccess: console.log,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const result = schema.safeParse({ email });
    if (!result.success) {
      const fieldErrors: any = {};
      for (const err of result.error.issues) {
        fieldErrors[err.path[0]] = err.message;
      }
      setErrors(fieldErrors);
      return;
    }
    return mutate(email);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-2xl overflow-hidden">
        <CardHeader>
          <h1 className="text-2xl font-bold text-primary text-center md:text-left">
            Forgot password
          </h1>
          <p className="text-muted-foreground">
            Enter your email address to initiate the process
          </p>
        </CardHeader>
        <CardContent>
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
              {loading ? "Loading..." : "Send the email"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPassword,
  beforeLoad: ({ context }) => {
    // Redirect if already authenticated
    if (context.auth?.loggedIn) {
      throw redirect({ to: "/dashboard" });
    }
  },
});
