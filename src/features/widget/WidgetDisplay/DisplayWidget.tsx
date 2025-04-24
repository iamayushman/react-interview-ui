import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Widget } from "../../../schema/widget-form-schema";
import { useDeleteWidget } from "../hooks/useDeleteWidget";

export interface DisplayWidgetProps {
  widget: Widget;
  onClick: (widget: Widget) => void;
}

const DisplayWidget = ({
  widget,
  onClick,
}: DisplayWidgetProps): JSX.Element => {
  const { description, name, price } = widget;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);
  const { mutate: deleteWidget } = useDeleteWidget();

  const handleDelete = (widget: Widget) => {
    setSelectedWidget(widget);
    setConfirmOpen(true);
  };

  return (
    <Grid item xs={6}>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete Widget</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{selectedWidget?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button
            color="error"
            onClick={() => {
              if (selectedWidget) {
                deleteWidget(selectedWidget);
              }
              setConfirmOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography component="div" gutterBottom variant="h4">
              {name}
            </Typography>
            <Typography component="div" gutterBottom variant="h5">
              ${price}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {description}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            startIcon={<Delete />}
            onClick={() => handleDelete(widget)}
            color="error"
          >
            Delete
          </Button>
          <Button startIcon={<Edit />} onClick={() => onClick(widget)}>
            Edit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default DisplayWidget;
