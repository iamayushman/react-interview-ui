import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Button, Fab } from "@mui/material";
import { Widget } from "../../../schema/widget-form-schema";
import EditWidget from "../EditWidget/EditWidget";
import { useWidgets } from "../hooks/useWidgets";
import WidgetDisplay from "../WidgetDisplay/DisplayWidget";

export const WidgetList = (): JSX.Element => {
  const { data: widgets, isLoading, error, refetch } = useWidgets();
  const [widget, setWidget] = useState<Widget | null>(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleEditWidget = (widget: Widget) => {
    setWidget(widget);
    handleOpen();
  };

  const handleNew = () => {
    setWidget(null);
    handleOpen();
  };

  return (
    <Stack
      spacing={4}
      sx={{ margin: "auto", maxWidth: 900, paddingTop: "4em", width: "100%" }}
    >
      <Typography sx={{ textAlign: "center" }} variant="h3">
        List of widgets
      </Typography>

      {isLoading && <>Loading...</>}

      {error && (
        <Typography>
          Error Loading list. <Button onClick={() => refetch()}>Reload</Button>
        </Typography>
      )}

      {widgets?.length === 0 && (
        <>
          <Typography>No Widgets yet!!</Typography>
          <Typography>
            Add new widget by clicking on the plus button on the bottom right
            corner of the screen.
          </Typography>
        </>
      )}
      <Grid
        container
        justifyContent="center"
        spacing={4}
        sx={{ paddingRight: 4, width: "100%" }}
      >
        {widgets?.map((current) => (
          <WidgetDisplay
            key={current.name}
            widget={current}
            onClick={(widget) => handleEditWidget(widget)}
          />
        ))}
      </Grid>
      {open && <EditWidget open={open} widget={widget} onClick={handleClose} />}

      <Tooltip title="Add new widget" arrow>
        <Fab
          color="primary"
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
          }}
          onClick={handleNew}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </Stack>
  );
};
