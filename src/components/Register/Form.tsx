import { useState } from "react";
import { z } from "zod";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const schema = z
  .object({
    name: z.string().min(6, "Name must contain at least 6 characters"),
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

type Errors = {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
};

const RegisterForm = ({
  onSubmit,
  error,
  loading,
}: {
  onSubmit: (data: any) => void;
  error: { message: string } | null;
  loading: boolean;
}) => {
  const [errors, setErrors] = useState<Errors>({});
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name")?.toString() || "",
      username: formData.get("username")?.toString() || "",
      email: formData.get("email")?.toString() || "",
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

    return onSubmit(data);
  }

  return (
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
            <p className="text-destructive text-sm mt-1">{errors.username}</p>
          )}
        </div>
        <div>
          <Label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-muted-foreground"
          >
            First and last name (display name)
          </Label>
          <Input name="name" id="name" className="w-full" autoComplete="name" />
          {errors.name && (
            <p className="text-destructive text-sm mt-1">{errors.name}</p>
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
            <p className="text-destructive text-sm mt-1">{errors.password}</p>
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
  );
};

export default RegisterForm;
