import { createFileRoute } from "@tanstack/react-router";

import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

const Index = () => {
  return (
    <main className="flex h-screen flex-col justify-center items-center">
      <Card className="px-4 w-full md:w-2/3 lg:w-1/2 mx-auto">
        <h1 className="text-3xl text-center font-semibold mb-4">Coaching</h1>
        <form method="post">
          <div className="mb-4">
            <Label htmlFor="username" className="mb-0.5">
              Username
            </Label>
            <Input name="username" id="username" />
          </div>
          <div className="mb-2">
            <Label htmlFor="email" className="mb-0.5">
              Email
            </Label>
            <Input name="email" id="email" />
          </div>
          <div className="mb-2">
            <Label htmlFor="password" className="mb-0.5">
              Password
            </Label>
            <Input name="password" id="password" />
          </div>
          <Button type="submit">Sign up</Button>
        </form>
      </Card>
    </main>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
