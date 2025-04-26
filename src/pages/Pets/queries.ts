import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axios } from "../../lib";
import { AddPet } from "../../types";

export const useGetPets = ({
  searchTerm,
  skip,
  sortBy,
  sortOrder,
  adoptionStatus,
}: {
  searchTerm: string | void;
  skip: number;
  sortBy: string;
  sortOrder: string;
  adoptionStatus?: "Available" | "Pending" | "Adopted";
}) => {
  return useQuery({
    queryKey: ["Get-Pets", searchTerm, skip, sortBy, sortOrder, adoptionStatus],

    queryFn: async () => {
      const { data } = await axios.get("api/pets", {
        params: { searchTerm, skip, sortBy, sortOrder, adoptionStatus },
      });
      return data;
    },
  });
};

export const useAddPet = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values: AddPet) => {
      const { data } = await axios.post(`api/pets`, values);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Get-Pets"] });
      navigate("/pets");
    },
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const { data } = await axios.post("api/pets/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return data;
    },
  });
};

export const useDelPet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`api/pets/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Get-Pets"] });
    },
  });
};

export const useUpdatePet = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ id, values }: { id: number; values: AddPet }) => {
      const { data } = await axios.patch(`api/pets/${id}`, values);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Get-Pets"] });
      navigate(-1);
    },
    onError: () => {
      console.log("error");
    },
  });
};

export const useGetUniquePets = (id: number | undefined, enabled: boolean) => {
  return useQuery({
    queryKey: ["Get-one-pets", id],
    queryFn: async () => {
      const { data } = await axios.get(`api/pets/${id}`);
      return data;
    },
    enabled,
  });
};
