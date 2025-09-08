import axios from "@/lib/axios";

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
  register: (data: { username: string; email: string; password: string }) =>
    axios.post(ENDPOINTS.REGISTER, data),
  getUser: () => axios.get(ENDPOINTS.USER),
};

export default authService;
