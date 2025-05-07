import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

export const usersService = {
  getUsers: async (page, count) => {
    return apiClient.get(endpoints.users.getAll(), {
      params: { page, count },
    });
  },
};
