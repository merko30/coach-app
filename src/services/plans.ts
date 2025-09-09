import axiosInstance from "@/lib/axios";

const ENDPOINTS = {
  PLANS: "/plans",
  PLAN: (id: string) => `/plans/${id}`,
};

const plansService = {
  get: () => axiosInstance.get(ENDPOINTS.PLANS),
  create: (data: any) => axiosInstance.post(ENDPOINTS.PLANS, data),
};

export default plansService;
