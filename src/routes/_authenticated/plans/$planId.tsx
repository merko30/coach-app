import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { CheckCircle, DollarSign, Info, Star } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import plansService from "@/services/plans";

export const Route = createFileRoute("/_authenticated/plans/$planId")({
  component: RouteComponent,
  loader: ({ params }) => plansService.getOne(params.planId),
});

function RouteComponent() {
  const data = Route.useLoaderData();

  const plan = data.data;
  console.log(plan);
  return (
    <div className="container mx-auto max-w-5xl p-6 space-y-6">
      {/* Header */}
      <Card className="shadow-md">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
            <p className="text-muted-foreground">{plan.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">{plan.level}</Badge>
            <Badge variant="outline">{plan.type}</Badge>
            {plan.price && (
              <div className="flex items-center gap-1 font-semibold text-lg">
                <DollarSign size={18} /> {plan.price}
              </div>
            )}
            <Button>Get this plan</Button>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent>
          {/* Left side: Coach */}
          <div className="flex flex-col sm:items-center sm:flex-row gap-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={plan.coach.user.avatar_url}
                alt={plan.coach.user.name}
              />
              <AvatarFallback>{plan.coach.user.name}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{plan.coach.user.name}</h3>
              <p className="text-sm text-muted-foreground">
                {plan.coach.description}
              </p>
            </div>
          </div>
          {/* Right side: Tabs */}
          <Tabs defaultValue="features">
            <TabsList className="mb-4">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="weeks">First week preview</TabsTrigger>
              <TabsTrigger value="info">More Info</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-2">
              {plan.features?.map((f: string, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={18} />
                  <span>{f}</span>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="weeks">
              <p className="text-sm text-muted-foreground">
                Weeks overview will be displayed here.
              </p>
            </TabsContent>

            <TabsContent value="info">
              <div className="flex items-start gap-2">
                <Info className="mt-1 text-blue-500" size={18} />
                <p className="text-sm text-muted-foreground">
                  Extra information about the plan, refund policies, or FAQ.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
