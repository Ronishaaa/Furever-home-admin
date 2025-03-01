import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axios } from "../../lib";
import { AddSuccessStory } from "../../types";

export const useGetAllSuccessStories = () => {
  return useQuery({
    queryKey: ["Get-Success-Stories"],

    queryFn: async () => {
      const { data } = await axios.get("api/success-stories");
      return data;
    },
  });
};

export const useAddSuccessStories = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values: AddSuccessStory) => {
      const { data } = await axios.post(`api/success-stories`, values);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Get-Success-Stories"] });
      navigate("/success-stories");
    },
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const { data } = await axios.post(
        "api/success-stories/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return data;
    },
  });
};

export const useDelSuccessStories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`api/success-stories/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Get-Success-Stories"] });
    },
  });
};

export const useUpdateSuccessStories = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id: number;
      values: AddSuccessStory;
    }) => {
      const { data } = await axios.patch(`api/success-stories/${id}`, values);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Get-Success-Stories"] });
      navigate(-1);
    },
  });
};

export const useGetUniqueSuccessStories = (
  id: number | undefined,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ["Get-one-success-stories", id],
    queryFn: async () => {
      const { data } = await axios.get(`api/success-stories/${id}`);
      return data;
    },
    enabled,
  });
};
