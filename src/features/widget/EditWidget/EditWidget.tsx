import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormInputText } from "../../../components/forms/FormInputText";
import { Widget, widgetSchema } from "../../../schema/widget-form-schema";
import { useCreateWidget } from "../hooks/useCreateWidget";
import { useUpdateWidget } from "../hooks/useUpdateWidget";

export interface EditWidgetProps {
  open: boolean;
  widget: Widget | null;
  onClick: () => void;
}

const initialFormValue = {
  name: "",
  description: "",
  price: 0,
};

export default function EditWidget({
  widget,
  onClick,
  open,
}: Readonly<EditWidgetProps>) {
  const isEditMode = !!widget;
  const {
    handleSubmit,
    reset,
    control,
    formState: { isLoading },
  } = useForm<Widget>({
    resolver: zodResolver(widgetSchema),
    defaultValues: initialFormValue,
  });
  const [prevName, setPrevName] = useState("");

  const {
    mutate: createWidget,
    isPending: isCreatePending,
    isSuccess,
  } = useCreateWidget();
  const {
    mutate: updateWidget,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
  } = useUpdateWidget();

  useEffect(() => {
    if (isEditMode) {
      setPrevName(widget.name);
      reset(widget);
    } else {
      reset(initialFormValue);
    }
  }, [widget, reset, isEditMode]);

  const onError = async (error: FieldErrors<Widget>) => {
    toast.error(error.root?.message);
  };

  const onSubmit = async (data: Widget) => {
    if (isEditMode) {
      updateWidget({ prevName, widget: data });
    } else {
      createWidget(data);
    }
  };

  useEffect(() => {
    if (isUpdateSuccess || isSuccess) {
      onClick();
    }
  });

  return (
    <Box>
      <Dialog open={open}>
        <DialogTitle>{isEditMode ? "Edit" : "Create New"} Widget</DialogTitle>
        <DialogContent>
          <FormInputText
            disabled={isEditMode}
            name="name"
            control={control}
            label="Name"
          />
          <FormInputText
            name="description"
            control={control}
            label="Description"
            rows={3}
          />
          <FormInputText
            name="price"
            control={control}
            label="Price"
            type="number"
          />
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button onClick={onClick} color="primary">
            Cancel
          </Button>
          <Button
            disabled={isLoading || isCreatePending || isUpdatePending}
            onClick={handleSubmit(onSubmit, onError)}
            variant={"contained"}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
