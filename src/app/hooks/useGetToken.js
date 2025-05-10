import { useQuery } from "@tanstack/react-query";
import { client } from "../api/client";

const getToken = () => client.get("/auth");

export const useGetToken = () => {
  return useQuery({
    queryFn: async () => await getToken(),
    queryKey: ["/auth"],
  });
};
