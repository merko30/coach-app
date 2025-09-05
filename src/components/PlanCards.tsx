import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";

export function PlanCards({
  plans,
  onPick,
}: {
  plans: any[];
  onPick?: (plan: any) => void;
}) {
  if (!plans?.length) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
            <div className="mb-2 text-sm text-muted-foreground">
              {plan.description?.length > 80
                ? plan.description.slice(0, 80) + "..."
                : plan.description}
            </div>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button onClick={() => onPick?.(plan)} className="w-full">
              Pick this plan
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
