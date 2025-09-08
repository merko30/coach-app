import axiosInstance from "@/lib/axios";

const ENDPOINTS = {
  PLANS: "/plans",
  PLAN: (id: string) => `/plans/${id}`,
};

const plansService = {
  getPlans: () => axiosInstance.get(ENDPOINTS.PLANS),
};

export default plansService;
