import type { Saga } from "redux-saga";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import request from "../../utils/request";
import { type InitiateApp, actionKeys } from "./types";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* initiateApp(action: InitiateApp): Saga<void> {
  const requestURL = "http://localhost:3000/api/users/list";
  try {
    const response = yield call(request, requestURL);
    console.log(response);
  } catch (e) {
    yield console.log("FAILED");
  }
}

function* appSagas(): Saga<void> {
  yield takeLatest(actionKeys.INITIATE_APP, initiateApp);
}

export default appSagas;
