// @flow

import React from "react";
import { Field, reduxForm } from "redux-form";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import RenderField from "../../components/RenderField/RenderField";
import Error from "../../components/Error/Error";
import submit from "./submit";
import SignUpWrapper from "./SignUp.style";

const SignUp = props => {
  const { handleSubmit, submitting } = props;
  if (props.loggedInUser.username !== "") {
    return <Redirect to="/" />;
  }
  return (
    <SignUpWrapper onSubmit={handleSubmit(submit)}>
      <Field
        name="firstname"
        type="text"
        component={RenderField}
        label="Firstname"
      />
      <Field
        name="lastname"
        type="text"
        component={RenderField}
        label="Lastname"
      />
      <Field name="email" type="text" component={RenderField} label="Email" />
      <Field
        name="password"
        type="password"
        component={RenderField}
        label="Password"
      />
      <input
        className="care-recipient-info__submit"
        value="Sign up"
        type="submit"
        disabled={submitting}
      />
      {props.error && <Error message={props.error} />}
    </SignUpWrapper>
  );
};

const SignUpFormRedux = reduxForm({
  form: "signUpForm" // a unique identifier for this form
})(SignUp);

const mapStateToProps = state => ({
  loggedInUser: state.login.loggedInUser
});

export default withRouter(connect(mapStateToProps)(SignUpFormRedux));
