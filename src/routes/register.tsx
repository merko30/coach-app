import { createFileRoute } from "@tanstack/react-router";

import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

import { UserPlus } from "lucide-react";

const Register = () => {
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
          <form method="post" className="space-y-5">
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
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full mt-2 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground"
            >
              Sign up
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
