import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import React, { useCallback, useState } from "react";
import FormTab from "./components/FormTab";
import TabPanel from "./components/TabPanel";
import CampaignForm from "./components/CampaignForm";
import SubcampaignForm from "./components/SubcampaignForm";
import { CampaignFormState } from "./types";
import { useCampaign } from "./context/CampaignContext";
import { convertForm2Data } from "./utils";

const tabs = [
  {
    value: 0,
    label: "Thông tin",
  },
  {
    value: 1,
    label: "Chiến dịch",
  },
];

export default function App() {
  const { handleSubmit } = useCampaign();
  const [currentTab, setCurrentTab] = useState(0);

  const handleChangeTab = useCallback((newValue: number) => {
    setCurrentTab(newValue);
  }, []);

  const onSubmit = (values: CampaignFormState) => {
    const data = convertForm2Data(values);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Header */}
      <Container maxWidth="xl">
        <Stack py={2} justifyContent="end" direction="row">
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Container>

      <Divider />

      {/* Form content */}
      <Container maxWidth="xl">
        <Card>
          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <FormTab
              tabs={tabs}
              value={currentTab}
              onChange={handleChangeTab}
            />
          </Box>

          <TabPanel value={currentTab} index={0}>
            <Box p={4}>
              <CampaignForm />
            </Box>
          </TabPanel>

          <TabPanel value={currentTab} index={1}>
            <Box p={4}>
              <SubcampaignForm />
            </Box>
          </TabPanel>
        </Card>
      </Container>
    </form>
  );
}
