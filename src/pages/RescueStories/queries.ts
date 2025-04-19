import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axios } from "../../lib";
import { AddRescueStory } from "../../types";

export const useGetAllRescueStories = ({ skip }: { skip: number }) => {
  return useQuery({
    queryKey: ["Get-Rescue-Stories", skip],

    queryFn: async () => {
      const { data } = await axios.get("api/rescue-stories", {
        params: { skip },
      });
      return data;
    },
  });
};

export const useAddRescueStories = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values: AddRescueStory) => {
      const { data } = await axios.post(`api/rescue-stories`, values);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Get-Rescue-Stories"] });
      navigate("/rescue-stories");
    },
  });
};

export const useUploadImage = () => {
  const uploadImage = useMutation({
    mutationFn: async (files: File[]) => {
      try {
        const formData = new FormData();
        files.forEach((file) => formData.append("images", file));

        const { data } = await axios.post(
          "api/rescue-stories/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        return data;
      } catch (error) {
        console.error("Error uploading logo:", error);
        throw error;
      }
    },
  });

  return uploadImage;
};

export const useDelRescueStories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`api/rescue-stories/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Get-Rescue-Stories"] });
    },
  });
};

export const useUpdateRescueStories = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({
      id,
      values,
    }: {
      id: number;
      values: AddRescueStory;
    }) => {
      const { data } = await axios.patch(`api/rescue-stories/${id}`, values);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Get-Rescue-Stories"] });
      navigate(-1);
    },
  });
};

export const useGetUniqueRescueStories = (
  id: number | undefined,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ["Get-one-rescue-stories", id],
    queryFn: async () => {
      const { data } = await axios.get(`api/rescue-stories/${id}`);
      return data;
    },
    enabled,
  });
};
