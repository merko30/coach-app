import axiosInstance from "@/lib/axios";

const ENDPOINTS = {
  CONVERSATIONS: "/conversations",
  CONVERSATION: (id: number) => `/conversations/${id}`,
};

const conversationsService = {
  get: () => axiosInstance.get(ENDPOINTS.CONVERSATIONS),
  getOne: (id: number) => axiosInstance.get(ENDPOINTS.CONVERSATION(id)),
};

export default conversationsService;
