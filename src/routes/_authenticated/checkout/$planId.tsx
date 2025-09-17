import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

import plansService from "@/services/plans";
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/checkout/$planId")({
  component: CheckoutPage,
  loader: ({ params }) => plansService.getOne(params.planId),
});

export default function CheckoutPage() {
  const data = Route.useLoaderData();
  const plan = data.data;

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: plansService.createOrder,
    onSuccess: () => navigate({ to: "/dashboard" }),
  });

  const onPayAndComplete = () => {
    // TODO: handle payment

    mutate(plan.id);
  };

  if (!plan) return <div>Plan not found.</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Plan Card */}
        <div className="flex-2">
          <Card className="shadow rounded-lg">
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">{plan.level}</Badge>
                <Badge variant="outline">{plan.type}</Badge>
                <Badge variant="default">Weeks: {plan.weeks_count}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">{plan.description}</p>
              {plan.features && (
                <div>
                  <h3 className="font-semibold text-md text-gray-600 mb-1">
                    Features:
                  </h3>
                  <ul className="space-y-1">
                    {plan.features.map((feature: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-green-700"
                      >
                        <CheckCircle size={16} className="text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Right: Checkout Info */}
        <div className="flex-1 flex flex-col items-center gap-6">
          <div className="w-full max-w-sm p-6 border rounded-lg bg-background shadow">
            <h2 className="text-xl font-bold mb-4">Checkout</h2>
            <div className="flex justify-between mb-2">
              <span>Plan price</span>
              <span className="font-semibold">{plan.price} BAM</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span className="font-bold text-lg">{plan.price} BAM</span>
            </div>
            <Button onClick={onPayAndComplete} className="w-full">
              Pay & Complete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
