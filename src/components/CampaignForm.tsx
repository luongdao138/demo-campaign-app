import { Input, Stack, TextField } from "@mui/material";
import React, { FC } from "react";
import { useCampaign } from "../context/CampaignContext";

interface CampaignFormProps {}

const CampaignForm: FC<CampaignFormProps> = ({}) => {
  const {
    register,
    formState: { errors },
  } = useCampaign();

  return (
    <Stack gap={4}>
      <TextField
        label="Tên chiến dịch *"
        variant="standard"
        fullWidth
        error={!!errors?.name?.msg}
        helperText={errors?.name?.msg}
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
