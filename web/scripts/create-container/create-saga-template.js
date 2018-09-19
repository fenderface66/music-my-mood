import type { Saga } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import request from "../../utils/request";
import { testActionSuccess, testActionFailed } from "./actions";
import { type TestAction, actionKeys } from "./types";

function* testSaga(action: TestAction): Saga<void> {
  const requestURL: string = "";
  try {
    const response = yield call(request, requestURL);
    yield put(testActionSuccess(response));
  } catch (e) {
    yield put(testActionFailed(e));
  }
}

function* Sagas(): Saga<void> {
  yield takeLatest(actionKeys.TEST_ACTION, testSaga);
}

export default Sagas;
