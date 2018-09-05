import { type InitiateApp, actionKeys } from "./types";

export const initiateApp = (): InitiateApp => {
  return {
    type: actionKeys.INITIATE_APP
  };
};
