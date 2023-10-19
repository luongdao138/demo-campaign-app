import { Box } from "@mui/material";
import React, { FC } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  role?: string;
  idPrefix?: string;
  labelPrefix?: string;
}

const TabPanel: FC<TabPanelProps> = (props) => {
  const {
    role = "tabpanel",
    idPrefix = "simple-tabpanel-",
    labelPrefix = "simple-tab-",
    children,
    value,
    index,
    ...other
  } = props;

  return (
    <div
      role={role}
      hidden={value !== index}
      id={`${idPrefix}${index}`}
      aria-labelledby={`${labelPrefix}${index}`}
      {...other}
    >
      {value === index ? children : null}
    </div>
  );
};

export default TabPanel;
