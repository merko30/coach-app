import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, Info } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import plansService from "@/services/plans";
import { ReadonlyDayCard } from "@/components/PlanForm/ReadonlyDayCard";

export const Route = createFileRoute("/_authenticated/plans/$planId")({
  component: RouteComponent,
  loader: ({ params }) => plansService.getOne(params.planId),
});

function RouteComponent() {
  const data = Route.useLoaderData();

  const plan = data.data;
  return (
    <div className="container mx-auto max-w-5xl md:p-6 space-y-6">
      {/* Header */}
      <Card className="shadow-md">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center md:flex-col md:items-start lg:items-center lg:flex-row justify-between gap-4">
          <div className="flex-none">
            <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
            <p className="text-muted-foreground">{plan.description}</p>
          </div>
          <div className="flex w-full justify-between items-center lg:justify-end lg:gap-4">
            <div className="w-full flex flex-col lg:w-auto gap-2">
              <Badge variant="secondary">{plan.level}</Badge>
              <Badge variant="outline">{plan.type}</Badge>
            </div>

            <div className="flex gap-4 flex-col items-center">
              {plan.price && (
                <div className="flex items-center gap-1 font-semibold text-lg">
                  {plan.price} BAM
                </div>
              )}
              <Button className="w-full sm:w-auto" asChild>
                <Link to="/checkout/$planId" params={{ planId: plan.id }}>
                  Get this plan
                </Link>
              </Button>
            </div>
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
            <TabsList className="my-8 sm:mt-0 flex-col w-full sm:flex-row">
              <TabsTrigger value="features" className="w-full">
                Features
              </TabsTrigger>
              <TabsTrigger value="weeks" className="w-full">
                First week preview
              </TabsTrigger>
              <TabsTrigger value="info" className="w-full">
                More Info
              </TabsTrigger>
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
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-7 gap-2">
                {plan.first_week.days.map((day: any, i: number) => (
                  <ReadonlyDayCard key={day.id} day={day} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="info">
              <div className="flex items-center gap-2">
                <Info className="text-blue-500" size={18} />
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
