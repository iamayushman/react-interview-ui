import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateWidget } from "../../../lib/api";
import { Widget } from "../../../schema/widget-form-schema";

export function useUpdateWidget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ prevName, widget }: { prevName: string; widget: Widget }) =>
      updateWidget(prevName, widget),
    onSuccess: () => {
      toast.success("Updated Successfully.");
      queryClient.invalidateQueries({ queryKey: ["widgets"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
