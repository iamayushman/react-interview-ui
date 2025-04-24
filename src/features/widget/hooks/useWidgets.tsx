import { useQuery } from "@tanstack/react-query";
import { fetchAllWidgets } from "../../../lib/api";

export function useWidgets() {
  return useQuery({
    queryKey: ["widgets"],
    queryFn: fetchAllWidgets,
  });
}
