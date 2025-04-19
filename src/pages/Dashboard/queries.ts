import { useQuery } from "@tanstack/react-query";
import { axios } from "../../lib";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const { data } = await axios.get("/api/dashboard");
      return data;
    },
  });
};
