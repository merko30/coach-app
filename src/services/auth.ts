import axios from "@/lib/axios";
import type { RegisterData, UpdateData } from "@/types/auth";

const ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REGISTER: "/auth/register",
  USER: "/auth/me",
  REFRESH: "/auth/refresh",
  AVATAR: "/auth/avatar",
};

const authService = {
  login: (data: { email: string; password: string }) =>
    axios.post(ENDPOINTS.LOGIN, data),
  logout: () => axios.post(ENDPOINTS.LOGOUT),
  register: (data: RegisterData) => axios.post(ENDPOINTS.REGISTER, data),
  getUser: () => axios.get(ENDPOINTS.USER),
  refresh: () => axios.post(ENDPOINTS.REFRESH),
  update: (data: UpdateData) => axios.put(ENDPOINTS.USER, data),
  updateAvatar: (file: File | null) => {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    return axios.post(ENDPOINTS.AVATAR, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default authService;
