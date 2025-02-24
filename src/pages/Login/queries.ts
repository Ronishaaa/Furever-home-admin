import { useMutation } from "@tanstack/react-query";
import { axios } from "../../lib";
import { LoginPayload, LoginResponse } from "../../types";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (payload: LoginPayload) => {
      const response = await axios.post("/api/login", payload);
      return response.data;
    },
  });
};
