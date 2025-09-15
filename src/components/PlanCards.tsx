import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";
import { User } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function PlanCards({
  plans,
  onPick,
}: {
  plans: any[];
  onPick?: (plan: any) => void;
}) {
  if (!plans?.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {plans.map((plan) => (
        <Card key={plan.id}>
          <CardHeader>
            <CardTitle className="mb-2">{plan.title}</CardTitle>
            <div className="flex gap-2">
              <Badge>{plan.level}</Badge>
              <Badge variant={"outline"}>Weeks: {plan.weeks.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Description:
              <br />
              {plan.description?.length > 80
                ? plan.description.slice(0, 80) + "..."
                : plan.description}
            </p>

            <div className="flex items-center flex-wrap gap-2">
              {plan.coach.user.avatar_url && (
                <img
                  src={plan.coach.user.avatar_url}
                  className="flex-none size-8 rounded-full border-2"
                />
              )}

              {!plan.coach.user.avatar && (
                <User
                  size={32}
                  className="border-2 border-black rounded-full"
                />
              )}
              <p className="text-sm">
                {plan.coach.user.name ?? plan.coach.user.email}
              </p>
            </div>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button asChild className="w-full">
              <Link to="/plans/$planId" params={{ planId: plan.id }}>
                See details
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
