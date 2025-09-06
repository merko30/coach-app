import { useQuery } from "@tanstack/react-query";
import { PlanCards } from "../PlanCards";

const getPlansFn = async () => {
  const response = await fetch("http://localhost:8000/plans", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};

const getAthletePlansFn = async () => {
  const response = await fetch("http://localhost:8000/auth/user/plans", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};

const AthleteDashboard = () => {
  const {
    data: plansData,
    isPending: plansLoading,
    error: plansError,
  } = useQuery({
    queryFn: getPlansFn,
    queryKey: ["plans"],
  });

  const {
    data: athletePlansData,
    isPending: loading,
    error,
  } = useQuery({
    queryFn: getAthletePlansFn,
    queryKey: ["athlete-plans"],
  });

  if (loading && plansLoading) {
    return <div>Loading...</div>;
  }

  if (athletePlansData && athletePlansData?.plans?.length) {
    return athletePlansData.plans.map((plan: any) => (
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
