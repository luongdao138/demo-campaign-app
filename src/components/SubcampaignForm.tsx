import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { FC, useState } from "react";
import SubcampaignAdForm from "./SubcampaignAdForm";
import { genDefaultSubCampaign, useCampaign } from "../context/CampaignContext";
import CancelIcon from "@mui/icons-material/Cancel";

interface SubcampaignFormProps {}

const SubcampaignForm: FC<SubcampaignFormProps> = ({}) => {
  const { formValues, setValue, register } = useCampaign();
  const theme = useTheme();

  const [selectedSubCampaignId, setSelectedSubCampaignId] = useState<string>(
    formValues.subCampaigns[0].id
  );

  const seletedSubCampaignIndex = formValues.subCampaigns.findIndex(
    (sc) => sc.id === selectedSubCampaignId
  );
  const selectedSubCampaign = formValues.subCampaigns[seletedSubCampaignIndex];

  const onAddSubCampaign = () => {
    setValue("subCampaigns", [
      ...formValues.subCampaigns,
      genDefaultSubCampaign(formValues.subCampaigns.length),
    ]);
  };

  const onChangeCampaign = (id: string) => {
    setSelectedSubCampaignId(id);
  };

  return (
    <Stack gap={4}>
      {/* List subcampaigns */}
      <Stack width="100%" alignItems="flex-start" direction="row" gap={2}>
        <IconButton
          onClick={onAddSubCampaign}
          sx={{ flexShrink: 0 }}
          color="secondary"
          aria-label="add"
        >
          <AddIcon />
        </IconButton>

        <Stack flex={1} direction="row" gap={2} flexWrap="wrap">
          {formValues.subCampaigns.map((sc) => {
            const totalCampaignAds =
              sc.ads.reduce((acc, current) => acc + current.quantity, 0) ?? 0;
            const isSelected = sc.id === selectedSubCampaignId;

            return (
              <Card
                onClick={() => onChangeCampaign(sc.id)}
                sx={{
                  cursor: "pointer",
                  p: 3,
                  border: isSelected
                    ? `2px solid ${theme.palette.primary.main}`
                    : "none",
                }}
                key={sc.id}
              >
                <Stack gap={1} alignItems="center">
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography fontWeight={"500"} variant="h5">
                      {sc.name}
                    </Typography>
                    {sc.status ? (
                      <CheckCircleIcon fontSize="small" color="success" />
                    ) : (
                      <CancelIcon fontSize="small" color="error" />
                    )}
                  </Stack>
                  <Typography variant="h5">{totalCampaignAds}</Typography>
                </Stack>
              </Card>
            );
          })}
        </Stack>
      </Stack>

      {/* Subcampaign form */}
      {selectedSubCampaign ? (
        <Stack gap={5}>
          {/* Name and status */}
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                label="Tên chiến dịch con *"
                variant="standard"
                fullWidth
                {...register(`subCampaigns.${seletedSubCampaignIndex}.name`)}
              />
            </Grid>
            <Grid item xs={4}>
              <Stack alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      inputProps={{ "aria-label": "Campaign active" }}
                      {...register(
                        `subCampaigns.${seletedSubCampaignIndex}.status`
                      )}
                    />
                  }
                  label="Đang hoạt động"
                />
              </Stack>
            </Grid>
          </Grid>

          {/* Ads */}
          <Typography variant="h5" fontWeight="500" textTransform="uppercase">
            Danh sách quảng cáo
          </Typography>

          <SubcampaignAdForm
            seletedSubCampaignIndex={seletedSubCampaignIndex}
          />
        </Stack>
      ) : null}
    </Stack>
  );
};

export default SubcampaignForm;
