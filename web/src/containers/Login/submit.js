/* eslint-disable no-underscore-dangle */
import { type Dispatch } from "redux";
import { SubmissionError } from "redux-form";
import { loginUser } from "./actions";

function submit(values: any, dispatch: Dispatch<*>) {
  const errors = {};
  if (!values.email) {
    errors.email = "You must enter an email";
  }
  if (!values.password) {
    errors.password = "You must enter an password.";
  }
  if (Object.getOwnPropertyNames(errors).length > 0) {
    throw new SubmissionError(errors);
  } else {
    dispatch(loginUser(values));
  }
}

export default submit;
