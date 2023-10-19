import { Campaign, CampaignFormState } from "../types";

export function convertForm2Data(formValues: CampaignFormState) {
  const cloned = structuredClone(formValues);

  return {
    information: {
      name: cloned.name,
      describe: cloned.description,
    },
    subCampaigns: cloned.subCampaigns.map((sub: any) => {
      delete sub.id;

      sub.ads.forEach((ad: any) => delete ad.id);
      return sub;
    }),
  };
}

export function updateObjectWithKey(obj: any, name: string, value: any) {
  const cloned = structuredClone(obj);

  let target = cloned;
  const keys = name.split(".");

  while (keys.length > 0) {
    const key = keys[0];
    const numericRegex = /^[0-9]*$/;
    const isIndexKey = numericRegex.test(key);

    if (keys.length === 1) {
      if (isIndexKey && Array.isArray(target)) {
        target[parseInt(key)] = value;
      } else {
        target[key] = value;
      }
    } else {
      if (isIndexKey) {
        target = target.at(key);
      } else {
        target = target[key];
      }

      if (!target) break;
    }

    keys.shift();
  }

  return cloned;
}

export function getObjectValueWithKey(obj: any, name: string) {
  const cloned = structuredClone(obj);

  let target = cloned;
  const keys = name.split(".");

  while (keys.length > 0) {
    const key = keys[0];
    const numericRegex = /^[0-9]*$/;
    const isIndexKey = numericRegex.test(key);

    if (keys.length === 1) {
      if (isIndexKey && Array.isArray(target)) {
        return target[parseInt(key)];
      } else {
        return target[key];
      }
    } else {
      if (isIndexKey) {
        target = target.at(key);
      } else {
        target = target[key];
      }

      if (!target) break;
    }

    keys.shift();
  }

  return undefined;
}

export function checkValidForm(values: any): boolean {
  return true;
}
