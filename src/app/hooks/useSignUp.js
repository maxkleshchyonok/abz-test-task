import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../api/client";
import { useState } from "react";

const signUp = (body) => client.post("/auth", body);

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(false);

  const mutation = useMutation({
    mutationFn: async (body) => {
      return signUp(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/users", 1, 6] });
    },
    onError: () => {
      setError(true);
    },
  });

  return {
    signUp: mutation.mutate,
    isPending: mutation.isPending,
    error,
    isSuccess: mutation.isSuccess,
  };
};
