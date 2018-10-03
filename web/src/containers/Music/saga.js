import type { Saga } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import request from "../../utils/request";
import { getMusicSuccess, getMusicFailed } from "./actions";
import { type GetMusic, actionKeys } from "./types";

function* getMusic(action: GetMusic): Saga<void> {
  const requestURL: string = `http://localhost:3000/api/music?longitude=${
    action.payload.longitude
  }&latitude=${action.payload.latitude}&userID=${action.payload.userID}`;
  try {
    console.log(requestURL);
    const response = yield call(request, encodeURI(requestURL));
    yield put(getMusicSuccess(response));
  } catch (e) {
    yield put(getMusicFailed(e));
  }
}

function* Sagas(): Saga<void> {
  yield takeLatest(actionKeys.GET_MUSIC, getMusic);
}

export default Sagas;
