import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../lib";

export const useGetAllApplications = () => {
  return useQuery({
    queryKey: ["Get-all-applications"],

    queryFn: async () => {
      const { data } = await axios.get("api/application");
      return data;
    },
  });
};

export const useDelApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`api/application/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Get-all-applications"] });
    },
  });
};

export const useGetUniqueApplication = (
  id: number | undefined,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ["Get-one-application", id],
    queryFn: async () => {
      const { data } = await axios.get(`api/application/${id}`);
      return data;
    },
    enabled,
  });
};
