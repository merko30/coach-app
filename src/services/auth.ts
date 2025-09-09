import axios from "@/lib/axios";
import type { RegisterData } from "@/types/auth";

const ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REGISTER: "/auth/register",
  USER: "/auth/me",
};

const authService = {
  login: (data: { email: string; password: string }) =>
    axios.post(ENDPOINTS.LOGIN, data),
  logout: () => axios.post(ENDPOINTS.LOGOUT),
  register: (data: RegisterData) => axios.post(ENDPOINTS.REGISTER, data),
  getUser: () => axios.get(ENDPOINTS.USER),
};

export default authService;
