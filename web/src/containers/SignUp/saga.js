import type { Saga } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import { stopSubmit } from "redux-form";
import request from "../../utils/request";
import { loginUserSuccess } from "../Login/actions";
import { type CreateUser, actionKeys } from "./types";

function* createUser(action: CreateUser): Saga<void> {
  const requestURL: string = "http://localhost:3000/api/users/create";
  try {
    const response = yield call(request, requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        user: action.createData
      })
    });
    console.log("THIS IS THE RESPONSE");
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response.user));
    yield put(loginUserSuccess(response.user));
  } catch (e) {
    const errors = yield JSON.parse(e.message);
    yield put(stopSubmit("signUpForm", errors));
  }
}

function* signUpSagas(): Saga<void> {
  yield takeLatest(actionKeys.CREATE_USER, createUser);
}

export default signUpSagas;
