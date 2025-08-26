import { createFileRoute } from "@tanstack/react-router";

import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

const Register = () => {
  return (
    <Card className="px-4 max-w-3xl mx-auto">
      <form method="post">
        <div className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input name="username" id="username" />
        </div>
        <div className="mb-2">
          <Label htmlFor="email">Email</Label>
          <Input name="email" id="email" />
        </div>
        <div className="mb-2">
          <Label htmlFor="password">Password</Label>
          <Input name="password" id="password" />
        </div>
        <Button type="submit">Sign up</Button>
      </form>
    </Card>
  );
};

export const Route = createFileRoute("/register")({
  component: Register,
});
