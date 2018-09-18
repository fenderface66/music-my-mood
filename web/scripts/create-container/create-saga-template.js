import type { Saga } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import { stopSubmit } from "redux-form";
import request from "../../utils/request";
import { UserSuccess } from "./actions";
import { type TestAction, actionKeys } from "./types";

function* testSaga(action: TestAction): Saga<void> {
  const requestURL: string = "http://localhost:3000/api/users/";
  try {
    const response = yield call(request, requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        user: action.Data
      })
    });
    localStorage.setItem("user", JSON.stringify(response.user));
    yield put(UserSuccess(response.user));
  } catch (e) {
    const errors = yield JSON.parse(e.message);
    yield put(stopSubmit("Form", errors));
  }
}

function* Sagas(): Saga<void> {
  yield takeLatest(actionKeys.TEST_ACTION, testSaga);
}

export default Sagas;
