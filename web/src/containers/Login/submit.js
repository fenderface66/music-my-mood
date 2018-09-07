/* eslint-disable no-underscore-dangle */
import { SubmissionError } from "redux-form";
import { loginUser } from "./actions";

function submit(values, dispatch, props) {
  const errors = {};
  if (!values.email) {
    errors.firstname = "You must enter an email";
  }
  if (!values.password) {
    errors.lastname = "You must enter an password.";
  }
  if (Object.getOwnPropertyNames(errors).length > 0) {
    throw new SubmissionError(errors);
  } else {
    dispatch(loginUser(values));
  }
}

export default submit;
