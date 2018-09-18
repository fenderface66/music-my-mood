// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { type Props } from "./types";
import containerNameWrapper from "./containerName.style";

class containerName extends Component<Props> {
  render() {
    return (
      <containerNameWrapper>
        <h1>Welcome to the containerName component</h1>
      </containerNameWrapper>
    );
  }
}

const mapStateToProps = state => ({});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(containerName)
);
