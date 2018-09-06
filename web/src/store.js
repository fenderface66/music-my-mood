import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { call, all, fork } from "redux-saga/effects";
import reducers from "./reducers";
import appSaga from "./containers/App/saga";
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
    yield all([forkAutoRestarting(appSaga)]);
  }

  sagaMiddleware.run(rootSaga);

  return store;
};
