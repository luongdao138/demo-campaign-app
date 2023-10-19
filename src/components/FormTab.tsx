import { Tab, Tabs } from "@mui/material";
import React from "react";

interface FormTabProps {
  value: number;
  tabs: { value: number; label: string }[];
  onChange: (value: number) => void;
  arialLabel?: string;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const FormTab: React.FC<FormTabProps> = ({
  onChange,
  tabs,
  value,
  arialLabel = "basic tabs example",
}) => {
  return (
    <Tabs
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      aria-label={arialLabel}
    >
      {tabs.map((tab) => (
        <Tab
          sx={{ px: 6 }}
          label={tab.label}
          key={tab.value}
          {...a11yProps(value)}
        />
      ))}
    </Tabs>
  );
};

export default FormTab;
