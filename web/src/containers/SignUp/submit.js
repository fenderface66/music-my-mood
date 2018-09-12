/* eslint-disable no-underscore-dangle */
import { type Dispatch } from "redux";
import { SubmissionError } from "redux-form";
import { createUser } from "./actions";

function submit(values: any, dispatch: Dispatch<*>) {
  const errors = {};
  if (!values.firstname) {
    errors.firstname = "You must enter an firstname";
  }
  if (!values.lastname) {
    errors.lastname = "You must enter an lastname";
  }
  if (!values.email) {
    errors.email = "You must enter an email";
  }
  if (!values.password) {
    errors.password = "You must enter an password.";
  }
  if (Object.getOwnPropertyNames(errors).length > 0) {
    throw new SubmissionError(errors);
  } else {
    dispatch(createUser(values));
  }
}

export default submit;
