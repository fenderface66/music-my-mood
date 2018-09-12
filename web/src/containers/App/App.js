// @flow

import React, { Component } from "react";
import { type Dispatch } from "redux";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import { type Props } from "./types";
import { loginUserSuccess } from "../Login/actions";
import AppWrapper from "./App.style";
import Header from "../../components/Header/Header";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Home from "../Home/Home";

class App extends Component<Props> {
  async componentDidMount() {
    await this.checkForExistingUserData();
  }
  async checkForExistingUserData(): Promise<void> {
    const user: ?string = await localStorage.getItem("user");
    if (typeof user !== "string") {
      this.props.history.push("/login");
    } else {
      this.props.loginUserSuccess(JSON.parse(user));
      this.props.history.push("/home");
    }
  }
  getHeaderString(): string {
    if (this.props.loggedInUser) {
      return `Welcome ${this.props.loggedInUser.username}`;
    }
    return "Login";
  }
  render() {
    return (
      <AppWrapper>
        <Header title={this.getHeaderString()} />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signUp" component={SignUp} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </AppWrapper>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.login.loggedInUser
});

const mapDispatchToProps = (dispatch: Dispatch<*>): Object => ({
  loginUserSuccess: userData => dispatch(loginUserSuccess(userData))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
