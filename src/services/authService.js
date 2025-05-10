import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

export const authService = {
  getToken: async () => {
    return apiClient.get(endpoints.auth.getToken());
  },
  signUp: async (body, options) => {
    return apiClient.post(endpoints.auth.signUp(), body, options);
  },
};
