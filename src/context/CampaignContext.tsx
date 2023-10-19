import React, { createContext, useContext, useEffect, useState } from "react";
import {
  CampaignFormError,
  CampaignFormState,
  CampainContextState,
  SubCampaign,
  SubCampaignAd,
} from "../types";
import { v4 as uuid } from "uuid";
import {
  checkValidForm,
  getObjectValueWithKey,
  updateObjectWithKey,
} from "../utils";

const CampaignContext = createContext<CampainContextState>(
  {} as CampainContextState
);

interface CampaignProviderProps {
  children: React.ReactNode;
}

export const genDefaultSubCampaignAd = (index = 0): SubCampaignAd => {
  return {
    name: `Quảng cáo ${index}`,
    quantity: 0,
    id: uuid(),
  };
};

export const genDefaultSubCampaign = (index = 0): SubCampaign => {
  return {
    name: `Chiến dịch con ${index}`,
    status: true,
    id: uuid(),
    ads: [genDefaultSubCampaignAd(0)],
  };
};

const defaultFormValues: CampaignFormState = {
  description: "",
  name: "",
  subCampaigns: [genDefaultSubCampaign(0)],
};

const validate = (values: CampaignFormState): CampaignFormError => {
  const errors: CampaignFormError = {};

  // manually validate each fields
  if (!values.name.length) {
    errors.name = {
      error: "required",
      msg: "Tên chiến dịch là bắt buộc",
    };
  }

  errors.subCampaigns = values.subCampaigns.map(() => ({}));
  values.subCampaigns.forEach((c, index) => {
    if (!c.name.length) {
      // @ts-ignore
      errors.subCampaigns[index].name = {
        error: "required",
        msg: "Tên chiến dịch con là bắt buộc",
      };
    }

    // @ts-ignore
    errors.subCampaigns[index].ads = values.subCampaigns[index].ads.map(
      () => ({})
    );

    values.subCampaigns[index].ads.map((ad, adIndex) => {
      if (!ad.name.length) {
        // @ts-ignore
        errors.subCampaigns[index].ads[adIndex].name = {
          msg: "Tên quảng cáo là bắt buộc",
          error: "required",
        };
      }

      if (ad.quantity <= 0) {
        // @ts-ignore
        errors.subCampaigns[index].ads[adIndex].quantity = {
          msg: "Số lượng quảng cáo phải lớn hơn 0",
          error: "positive",
        };
      }
    });
  });

  return errors;
};

export const CampaignProvider = ({ children }: CampaignProviderProps) => {
  const [formValues, setFormValues] =
    useState<CampaignFormState>(defaultFormValues);
  const [formErrors, setFormErrors] = useState<CampaignFormError>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // setValue('foo', 'bar')
  // setValue('foo.bar', 'baz')
  // setValue('foo.0.bar.1.baz', 'boo')
  const setValue = (name: string, value: any) => {
    setFormValues((prev) => {
      const newFormValues = updateObjectWithKey(prev, name, value);

      return newFormValues;
    });
  };

  const handleFieldChange = (e: any) => {
    const inputType = e.target.type;
    const fieldName = e.target.name;
    if (!fieldName) return;

    let fieldValue = e.target.value;
    // for checkbox

    switch (inputType) {
      case "checkbox":
        fieldValue = e.target.checked;
        break;
      case "number":
        fieldValue = Number(fieldValue);

      default:
        break;
    }

    setValue(fieldName, fieldValue);
  };

  const handleSubmit =
    (callback: (values: CampaignFormState) => void) =>
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // marked as already click submit btn
      setIsSubmitted(true);

      // validate
      const errors = validate(formValues);
      setFormErrors(errors);
      if (checkValidForm(errors)) {
        callback(formValues);
      }
    };

  const register = (name: string) => {
    return {
      name,
      value: getObjectValueWithKey(formValues, name),
      onChange: handleFieldChange,
      checked: !!getObjectValueWithKey(formValues, name),
    };
  };

  useEffect(() => {
    if (!isSubmitted) return;

    setFormErrors(validate(formValues));
  }, [formValues, isSubmitted]);

  return (
    <CampaignContext.Provider
      value={{
        formValues,
        handleSubmit,
        handleFieldChange,
        register,
        setValue,
        formState: {
          errors: formErrors,
          isSubmitted,
        },
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const useCampaignContext = useContext(CampaignContext);
  if (!useCampaignContext) throw new Error("Not in context");

  return useCampaignContext;
};
