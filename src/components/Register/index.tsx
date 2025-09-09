import { useNavigate, useLocation } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { UserPlus } from "lucide-react";

import { Card } from "@/components/ui/card";

import authService from "@/services/auth";
import RegisterForm from "@/components/Register/Form";
import type { RegisterData } from "@/types/auth";

import { coachRegisterContent, athleteRegisterContent } from "./constants";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isCoach = location.pathname.includes("coach");

  const {
    mutate,
    error,
    isPending: loading,
  } = useMutation({
    mutationFn: authService.register,
    onSuccess: () => navigate({ to: "/login" }),
  });

  const onSubmit = (data: RegisterData) =>
    mutate({ ...data, is_coach: isCoach });

  const config = isCoach ? coachRegisterContent : athleteRegisterContent;

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden shadow-lg border border-border py-0">
        {/* Left panel: Branding/Features */}
        <div className="hidden md:flex flex-col justify-center items-center bg-primary text-primary-foreground px-10 py-12 w-1/2">
          <UserPlus className="w-16 h-16 mb-6" />
          <h2 className="text-3xl font-bold mb-4">{config.title}</h2>
          <p className="text-lg mb-8 text-primary-foreground/80 text-center">
            {config.description}
          </p>
          <ul className="space-y-3 w-auto max-w-xs mx-auto text-center">
            {config.features.map((feature) => (
              <li className="flex items-center gap-2" key={feature.text}>
                <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>{" "}
                {feature.text}
              </li>
            ))}
          </ul>
        </div>
        <RegisterForm onSubmit={onSubmit} error={error} loading={loading} />
      </Card>
    </main>
  );
};

export default Register;
