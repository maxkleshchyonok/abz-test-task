import { useQuery } from "@tanstack/react-query";
import { client } from "../api/client";

const getUsers = ({ page, count }) => {
  const url = `/users?page=${page}&count=${count}`;
  return client.get(url);
};

export const useGetUsers = ({ page, count }) => {
  return useQuery({
    queryFn: async () => await getUsers({ page, count }),
    queryKey: ["/users", page, count],
  });
};
