import { useQuery } from "@tanstack/react-query";
import { axios } from "../../lib";

export const useGetAllDonations = ({ skip }: { skip: number }) => {
  return useQuery({
    queryKey: ["Get-all-Donations", skip],

    queryFn: async () => {
      const { data } = await axios.get("api/donation", {
        params: { skip },
      });
      return data;
    },
  });
};
