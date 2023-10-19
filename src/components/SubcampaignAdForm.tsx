import {
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import React, { FC, useState } from "react";
import {
  genDefaultSubCampaignAd,
  useCampaign,
} from "../context/CampaignContext";

interface SubcampaignAdFormProps {
  seletedSubCampaignIndex: number;
}

const SubcampaignAdForm: FC<SubcampaignAdFormProps> = ({
  seletedSubCampaignIndex,
}) => {
  const [selectedAdIds, setSelectedAdIds] = useState<string[]>([]);
  const {
    formValues,
    register,
    setValue,
    formState: { errors },
  } = useCampaign();

  const currentAds = formValues.subCampaigns[seletedSubCampaignIndex].ads ?? [];

  const adsRows = [
    {
      id: "header",
    },
    ...currentAds,
  ];

  const onAddSubCampaignAd = () => {
    setValue(`subCampaigns.${seletedSubCampaignIndex}.ads`, [
      ...currentAds,
      genDefaultSubCampaignAd(0),
    ]);
  };

  const onRemoveSubCampaignAds = (ids: string | string[]) => {
    if (!Array.isArray(ids)) ids = [ids];

    setValue(
      `subCampaigns.${seletedSubCampaignIndex}.ads`,
      currentAds.filter((ad) => !ids.includes(ad.id))
    );
    setSelectedAdIds(selectedAdIds.filter((id) => !ids.includes(id)));
  };

  const onSelectItem = (id: string) => {
    const index = selectedAdIds.findIndex((i) => i === id);
    if (index === -1) {
      setSelectedAdIds([...selectedAdIds, id]);
    } else {
      setSelectedAdIds(selectedAdIds.filter((i) => i !== id));
    }
  };

  const onSelectAll = (isSelectAll: boolean) => {
    if (isSelectAll) {
      setSelectedAdIds(currentAds.map((ad) => ad.id));
    } else {
      setSelectedAdIds([]);
    }
  };

  return (
    <Stack>
      {adsRows.map((ad, index) => {
        return (
          <Box key={ad.id}>
            <Stack direction="row" alignItems="center" gap={3}>
              {ad.id === "header" ? (
                <>
                  <Checkbox
                    disabled={currentAds.length === 0}
                    checked={
                      selectedAdIds.length === currentAds.length &&
                      currentAds.length > 0
                    }
                    onChange={(e, checked) => onSelectAll(checked)}
                  />
                  <Typography sx={{ flex: 1 }}>
                    {!selectedAdIds.length ? (
                      "Tên quảng cáo *"
                    ) : (
                      <IconButton
                        onClick={() => onRemoveSubCampaignAds(selectedAdIds)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Typography>
                  <Typography sx={{ flex: 1 }}>
                    {!selectedAdIds.length ? "Số lượng *" : ""}
                  </Typography>
                  <Button
                    onClick={onAddSubCampaignAd}
                    startIcon={<AddIcon />}
                    variant="outlined"
                  >
                    Thêm
                  </Button>
                </>
              ) : (
                <>
                  <Checkbox
                    checked={selectedAdIds.includes(ad.id)}
                    onChange={() => onSelectItem(ad.id)}
                  />
                  <TextField
                    variant="standard"
                    fullWidth
                    {...register(
                      `subCampaigns.${seletedSubCampaignIndex}.ads.${
                        index - 1
                      }.name`
                    )}
                    error={
                      !!errors?.subCampaigns?.[seletedSubCampaignIndex]?.ads?.[
                        index - 1
                      ]?.name?.msg
                    }
                    helperText={
                      errors?.subCampaigns?.[seletedSubCampaignIndex]?.ads?.[
                        index - 1
                      ]?.name?.msg
                    }
                  />
                  <TextField
                    type="number"
                    fullWidth
                    variant="standard"
                    {...register(
                      `subCampaigns.${seletedSubCampaignIndex}.ads.${
                        index - 1
                      }.quantity`
                    )}
                    error={
                      !!errors?.subCampaigns?.[seletedSubCampaignIndex]?.ads?.[
                        index - 1
                      ]?.quantity?.msg
                    }
                    helperText={
                      errors?.subCampaigns?.[seletedSubCampaignIndex]?.ads?.[
                        index - 1
                      ]?.quantity?.msg
                    }
                  />
                  <IconButton
                    disabled={currentAds.length <= 1}
                    onClick={() => onRemoveSubCampaignAds(ad.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </Stack>
            <Divider sx={{ my: 2 }} />
          </Box>
        );
      })}
    </Stack>
  );
};

export default SubcampaignAdForm;
