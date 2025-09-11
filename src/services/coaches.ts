import axiosInstance from "@/lib/axios";

const ENDPOINTS = {
  COACHES: "/coaches",
  CURRENT: "/coaches/auth",
};

const coachesService = {
  get: () => axiosInstance.get(ENDPOINTS.COACHES),
  getCurrent: () => axiosInstance.get(ENDPOINTS.CURRENT),
};

export default coachesService;
