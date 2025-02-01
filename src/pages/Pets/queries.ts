import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axios } from "../../lib";
import { AddPet } from "../../types";

export const useGetPets = () => {
  return useQuery({
    queryKey: ["Get-Pets"],
    queryFn: async () => {
      const { data } = await axios.get(`/pets`);
      return data;
    },
  });
};

export const useAddPet = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values: AddPet) => {
      const { data } = await axios.post(`/add-pet`, values);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Get-Pets"] });
      navigate(-1);
    },
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const { data } = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload API Response:", data); // Debugging log
      return data; // Ensure this contains `{ images: [{ uri: "..." }] }`
    },
  });
};
