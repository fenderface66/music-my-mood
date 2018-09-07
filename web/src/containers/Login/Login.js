// @flow

import React, { Component } from "react";
import { type Dispatch, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import RenderField from "../../components/RenderField/RenderField";
import { type Props } from "./types";
import submit from "./submit";
import LoginWrapper from "./Login.style";

const Login = props => {
  const { handleSubmit, submitting } = props;
  return (
    <LoginWrapper onSubmit={handleSubmit(submit)}>
      <Field
        name="email"
        type="text"
        component={RenderField}
        label="Username"
      />
      <Field
        name="password"
        type="password"
        component={RenderField}
        label="Password"
      />
      <input
        className="care-recipient-info__submit"
        value="Login"
        type="submit"
        disabled={submitting}
      />
    </LoginWrapper>
  );
};

const mapStateToProps = state => ({
  loggedInUser: state.login.loggedInUser
});

export default withRouter(connect(mapStateToProps)(Login));
