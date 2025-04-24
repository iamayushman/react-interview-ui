import Stack from "@mui/material/Stack";
import React from "react";
import "./App.css";
import { WidgetList } from "./features/widget/WidgetList/WidgetList";

const App = (): JSX.Element => {
  return (
    <Stack>
      <WidgetList />
    </Stack>
  );
};

export default App;
