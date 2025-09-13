import { Card, CardContent, CardHeader } from "@/components/ui/card";
import authService from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import {
  createFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/verify-email")({
  component: RouteComponent,
});

function RouteComponent() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const navigate = useNavigate();

  const handleError = () => {
    toast.error("Invalid email verification link", {
      duration: 10000,
      dismissible: true,
    });
    navigate({ to: "/login" });
  };

  const { mutate } = useMutation({
    mutationFn: authService.verifyEmail,
    onSuccess: () => {
      toast.success("Email verified successfully!");
      navigate({ to: "/dashboard" });
    },
    onError: handleError,
  });

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      mutate(token);
    } else {
      handleError();
    }
  }, []);

  return (
    <div className="h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full px-4">
        <Card className="p-6 shadow-lg">
          <CardHeader>
            <h1 className="text-2xl font-semibold mb-4">Verifying Email...</h1>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Please wait while we verify your email address.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
