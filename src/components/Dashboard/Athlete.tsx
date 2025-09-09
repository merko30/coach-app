import { useQuery } from "@tanstack/react-query";
import { PlanCards } from "../PlanCards";
import plansService from "@/services/plans";
import { useAuth } from "@/context/AuthProvider";

const AthleteDashboard = () => {
  const { user } = useAuth();
  const {
    data: plansReponse,
    isPending: plansLoading,
    error: plansError,
  } = useQuery({
    queryFn: plansService.get,
    queryKey: ["plans"],
  });

  const plansData = plansReponse?.data;

  console.log(user);

  if (plansLoading) {
    return <div>Loading...</div>;
  }

  if (user.plans && user.plans?.length) {
    return user.plans?.map((plan: any) => (
      <div key={plan.id} className="p-6">
        {plan.name}
      </div>
    ));
  }

  if (plansData && plansData.length) {
    return (
      <div>
        <h1 className="text-2xl font-semibold">Start today, pick your plan</h1>
        <PlanCards plans={plansData} />
      </div>
    );
  }
};

export default AthleteDashboard;
