import { type Action, type State, actionKeys } from "./types";

const initialState = {
  loggedInUser: {
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    token: ""
  }
};

export default function loginReducer(
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
