export const actionKeys = {
  TEST_ACTION: "TEST_ACTION",
  TEST_ACTION_SUCCESS: "TEST_ACTION_SUCCESS",
  TEST_ACTION_FAILED: "TEST_ACTION_FAILED"
};

export type Props = {};

export type TestAction = {
  type: typeof actionKeys.TEST_ACTION
};

export type TestPayload = {
  data: string
};

export type State = {
  data: string
};

export type TestActionSuccess = {
  type: typeof actionKeys.TEST_ACTION_SUCCESS,
  payload: TestPayload
};

export type TestActionFAILED = {
  type: typeof actionKeys.TEST_ACTION_FAILED
};

export type Action = TestAction | TestActionSuccess | TestActionFAILED;
