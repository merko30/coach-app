import axiosInstance from "@/lib/axios";

const ENDPOINTS = {
  PLANS: "/plans",
  PLAN: (id: string) => `/plans/${id}`,
};

const plansService = {
  get: () => axiosInstance.get(ENDPOINTS.PLANS),
  create: (data: any) => axiosInstance.post(ENDPOINTS.PLANS, data),
  getOne: (id: string) => axiosInstance.get(ENDPOINTS.PLAN(id)),
};

export default plansService;
