import { type TestPayload, actionKeys } from "./types";

export const testAction = () => {
  return {
    type: actionKeys.TEST_ACTION
  };
};

export const testActionSuccess = (payload: TestPayload) => {
  return {
    type: actionKeys.TEST_ACTION_SUCCESS,
    payload
  };
};

export const testActionFailed = () => {
  return {
    type: actionKeys.TEST_ACTION_FAILED
  };
};
