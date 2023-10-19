import React from "react";

export type SubCampaignAd = {
  name: string;
  id: string;
  quantity: number;
};

export type SubCampaign = {
  name: string;
  status: boolean;
  id: string;
  ads: SubCampaignAd[];
};

export type SubCampaignForm = {
  name: string;
  status: boolean;
  ads: SubCampaignAd[];
};

export type Campaign = {
  information: {
    name: string;
    describe?: string;
  };
  subCampaigns: SubCampaign[];
};

export type CampaignFormState = {
  name: string;
  description: string;
  subCampaigns: SubCampaign[];
};

type FormError = {
  msg: string;
  error: string;
};

export type CampaignFormError = {
  name?: FormError;
  description?: FormError;
  subCampaigns?: {
    name?: FormError;
    ads?: {
      name?: FormError;
      quantity?: FormError;
    }[];
  }[];
};

export type CampainContextState = {
  formValues: CampaignFormState;
  handleFieldChange: (e: any) => void;
  handleSubmit: (
    callback: (values: CampaignFormState) => void
  ) => (e: React.FormEvent<HTMLFormElement>) => void;
  register: (name: string) => any;
  setValue: (name: string, value: any) => void;
  formState: {
    errors: CampaignFormError;
    isSubmitted: boolean;
  };
};
