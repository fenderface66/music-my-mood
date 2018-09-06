import { type Action, type State, actionKeys } from "./types";

const initialState = {
  loggedInUser: {
    username: "",
    email: "",
    token: ""
  }
};

export default function appReducer(
  state: State = initialState,
  action: Action
) {
  switch (action.type) {
    case actionKeys.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loggedInUser: action.userData
      };
    default:
      return state;
  }
}
