import { useQuery } from "@tanstack/react-query";
import { axios } from "../../lib";

export const useGetPets = () => {
  return useQuery({
    queryKey: ["Get-Pets"],
    queryFn: async () => {
      const { data } = await axios.get(`/pets`);
      return data;
    },
  });
};
