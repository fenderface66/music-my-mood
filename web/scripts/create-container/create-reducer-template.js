import { type Action, type State, actionKeys } from "./types";

const initialState = {
  data: ""
};

export default function testReducer(
  state: State = initialState,
  action: Action
) {
  switch (action.type) {
    case actionKeys.TEST_ACTION_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    default:
      return state;
  }
}
