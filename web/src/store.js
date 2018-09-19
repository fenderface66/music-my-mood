import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { call, all, fork } from "redux-saga/effects";
import reducers from "./reducers";
import loginSaga from "./containers/Login/saga";
import SignUpSaga from "./containers/SignUp/saga";
import MusicSaga from "./containers/Music/saga";
// create the saga middleware
const sagaMiddleware: any = createSagaMiddleware();
export default () => {
  const store = createStore(reducers, applyMiddleware(sagaMiddleware));

  function forkAutoRestarting(fn, ...args) {
    return fork(function*() {
      while (true) {
        try {
          yield call(fn, ...args);
        } catch (e) {
          console.log(e);
        }
      }
    });
  }

  function* rootSaga() {
    yield all([
      forkAutoRestarting(loginSaga),
      forkAutoRestarting(SignUpSaga),
      forkAutoRestarting(MusicSaga)
    ]);
  }

  sagaMiddleware.run(rootSaga);

  return store;
};
