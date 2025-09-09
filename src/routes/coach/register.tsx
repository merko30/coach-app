import Register from "@/components/Register";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/coach/register")({
  component: Register,
});
