import { combineReducers } from "redux";
import loginReducer from "./containers/Login/reducer";
export default combineReducers({
  login: loginReducer
});
