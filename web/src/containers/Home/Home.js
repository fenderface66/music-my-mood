// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { type Props } from "./types";
import HomeWrapper from "./Home.style";

class Home extends Component<Props> {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position);
    });
  }
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
