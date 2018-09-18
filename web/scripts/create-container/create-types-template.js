export const actionKeys = {
  TEST_ACTION: "TEST_ACTION",
  TEST_ACTION_SUCCESS: "TEST_ACTION_SUCCESS"
};

export type Props = {};

export type TestAction = {
  type: "TEST_ACTION"
};

export type TestActionSuccess = {
  type: "TEST_ACTION_SUCCESS"
};

export type Action = TestAction | TestActionSuccess;
