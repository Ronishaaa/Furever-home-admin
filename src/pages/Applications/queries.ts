import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axios } from "../../lib";
import { Application } from "../../types";

export const useGetAllApplications = ({ skip }: { skip: number }) => {
  return useQuery({
    queryKey: ["Get-all-applications", skip],

    queryFn: async () => {
      const { data } = await axios.get("api/application", {
        params: { skip },
      });
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

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ id, values }: { id: number; values: Application }) => {
      const { data } = await axios.patch(`api/application/${id}`, values);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Get-all-applications"] });
      navigate(-1);
    },
    onError: () => {
      console.log("error");
    },
  });
};
