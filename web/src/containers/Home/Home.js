// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import { type Props } from "./types";
import HomeWrapper from "./Home.style";

class Home extends Component<Props> {
  render() {
    return (
      <HomeWrapper>
        <h1>Welcome to the homepage</h1>
      </HomeWrapper>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.login.loggedInUser
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Home)
);
