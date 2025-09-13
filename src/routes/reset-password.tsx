import { useState } from "react";
import {
  createFileRoute,
  redirect,
  useLocation,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import authService from "@/services/auth";
import { toast } from "sonner";

const schema = z
  .object({
    password: z.string().min(8, "Password must contain at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must contain at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Errors = {
  password?: string;
  confirmPassword?: string;
  token?: string;
};

const ResetPassword = () => {
  const [errors, setErrors] = useState<Errors>({});
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const {
    mutate,
    error,
    isPending: loading,
  } = useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      navigate({ to: "/login" });
      toast.success("Your password has been reset");
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      password: formData.get("password")?.toString() || "",
      confirmPassword: formData.get("confirmPassword")?.toString() || "",
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

    if (!params.get("token")) {
      setErrors({ token: "Your link is invalid" });
      return;
    }

    const { password } = data;
    return mutate({ password, token: params.get("token")! });
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
                autoComplete="password"
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
              {loading ? "Loading..." : "Reset your password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export const Route = createFileRoute("/reset-password")({
  component: ResetPassword,
  beforeLoad: ({ context }) => {
    // Redirect if already authenticated
    if (context.auth?.loggedIn) {
      throw redirect({ to: "/dashboard" });
    }
  },
});
