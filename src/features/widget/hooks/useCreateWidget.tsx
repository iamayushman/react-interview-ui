import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createWidget } from "../../../lib/api";
import { Widget } from "../../../schema/widget-form-schema";

export function useCreateWidget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (widget: Widget) => createWidget(widget),
    onSuccess: () => {
      toast.success("Created Successfully.");
      queryClient.invalidateQueries({ queryKey: ["widgets"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
