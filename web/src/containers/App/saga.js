import type { Saga } from "redux-saga";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import request from "../../utils/request";
import { loginUserSuccess } from "./actions";
import { type LoginUser, type LognData, actionKeys } from "./types";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* loginUser(action: LoginUser): Saga<void> {
  const requestURL: string = "http://localhost:3000/api/users/login";
  try {
    const response = yield call(request, requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        user: action.loginData
      })
    });
    localStorage.setItem("user", JSON.stringify(response.user));
    yield put(loginUserSuccess(response.user));
  } catch (e) {
    console.log(e);
  }
}

function* appSagas(): Saga<void> {
  yield takeLatest(actionKeys.LOGIN_USER, loginUser);
}

export default appSagas;
