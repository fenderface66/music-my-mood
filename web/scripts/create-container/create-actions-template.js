import { actionKeys } from "./types";

export const testAction = () => {
  return {
    type: actionKeys.TEST_ACTION
  };
};

export const testActionSuccess = () => {
  return {
    type: actionKeys.TEST_ACTION_SUCCESS
  };
};
