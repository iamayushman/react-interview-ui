import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteWidget } from "../../../lib/api";
import { Widget } from "../../../schema/widget-form-schema";

export function useDeleteWidget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (widget: Widget) => deleteWidget(widget),
    onSuccess: () => {
      toast.success("Deleted Successfully.");
      queryClient.invalidateQueries({ queryKey: ["widgets"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
