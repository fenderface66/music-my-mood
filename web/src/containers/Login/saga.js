import type { Saga } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import { stopSubmit } from "redux-form";
import request from "../../utils/request";
import { loginUserSuccess } from "./actions";
import { type LoginUser, actionKeys } from "./types";

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
    yield put(
      stopSubmit("loginForm", { _error: "Username/Password incorrect" })
    );
  }
}

function* appSagas(): Saga<void> {
  yield takeLatest(actionKeys.LOGIN_USER, loginUser);
}

export default appSagas;
