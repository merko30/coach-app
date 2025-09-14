import axiosInstance from "@/lib/axios";
import type { CoachUpdateData } from "@/types/auth";

const ENDPOINTS = {
  COACHES: "/coaches",
  CURRENT: "/coaches/auth",
};

const coachesService = {
  get: () => axiosInstance.get(ENDPOINTS.COACHES),
  getCurrent: () => axiosInstance.get(ENDPOINTS.CURRENT),
  update: (data: CoachUpdateData) => axiosInstance.put(ENDPOINTS.CURRENT, data),
};

export default coachesService;
