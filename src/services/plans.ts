import axiosInstance from "@/lib/axios";

const ENDPOINTS = {
  PLANS: "/plans",
  PLAN: (id: string) => `/plans/${id}`,
  // TODO: move to orders service
  ORDER: (planId: string) => `/plans/${planId}/order`,
};

const plansService = {
  get: () => axiosInstance.get(ENDPOINTS.PLANS),
  create: (data: any) => axiosInstance.post(ENDPOINTS.PLANS, data),
  getOne: (id: string) => axiosInstance.get(ENDPOINTS.PLAN(id)),
  createOrder: (planId: string) =>
    axiosInstance.post(ENDPOINTS.ORDER(planId), {}),
};

export default plansService;
