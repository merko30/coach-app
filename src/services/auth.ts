import axios from "@/lib/axios";
import type { RegisterData } from "@/types/auth";

const ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REGISTER: "/auth/register",
  USER: "/auth/me",
  REFRESH: "/auth/refresh",
};

const authService = {
  login: (data: { email: string; password: string }) =>
    axios.post(ENDPOINTS.LOGIN, data),
  logout: () => axios.post(ENDPOINTS.LOGOUT),
  register: (data: RegisterData) => axios.post(ENDPOINTS.REGISTER, data),
  getUser: () => axios.get(ENDPOINTS.USER),
  refresh: () => axios.post(ENDPOINTS.REFRESH),
};

export default authService;
