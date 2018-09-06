// @flow

import React, { Component } from "react";
import type { Dispatch } from "redux";
import { connect } from "react-redux";
import { type Props } from "./types";
import { loginUser, loginUserSuccess } from "./actions";
import AppWrapper from "./App.style";
import Header from "../../components/Header/Header";

class App extends Component<Props> {
  async componentDidMount() {
    await this.checkForExistingUserData();
  }
  async checkForExistingUserData() {
    const user: ?string = await localStorage.getItem("user");
    return typeof user !== "string"
      ? this.props.loginUser({
          email: "r.heygate@gmail.com",
          password: "p@ssw0rd!"
        })
      : this.props.loginUserSuccess(JSON.parse(user));
  }
  render() {
    return (
      <AppWrapper>
        <Header title={`Welcome ${this.props.loggedInUser.username}`} />
      </AppWrapper>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.app.loggedInUser
});

const mapDispatchToProps = (dispatch: Dispatch<*>): Object => ({
  loginUser: loginData => dispatch(loginUser(loginData)),
  loginUserSuccess: userData => dispatch(loginUserSuccess(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
