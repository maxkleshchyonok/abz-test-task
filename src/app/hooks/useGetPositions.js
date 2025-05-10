import { useQuery } from "@tanstack/react-query";
import { client } from "../api/client";

const getPositions = () => client.get("/users/positions");

export const useGetPositions = () => {
  return useQuery({
    queryFn: async () => await getPositions(),
    queryKey: ["/users/positions"],
  });
};
