import { Input, Stack, TextField } from "@mui/material";
import React, { FC } from "react";
import { useCampaign } from "../context/CampaignContext";

interface CampaignFormProps {}

const CampaignForm: FC<CampaignFormProps> = ({}) => {
  const { register } = useCampaign();

  return (
    <Stack gap={4}>
      <TextField
        label="Tên chiến dịch *"
        variant="standard"
        fullWidth
        {...register("name")}
      />
      <TextField
        label="Mô tả"
        variant="standard"
        fullWidth
        {...register("description")}
      />
    </Stack>
  );
};

export default CampaignForm;
