// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { type Dispatch } from "redux";
import { withRouter } from "react-router-dom";
import { type Props } from "./types";
import { getMusic } from "./actions";
import MusicWrapper from "./Music.style";

class Music extends Component<Props> {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position: Position) => {
        console.log(position);
        this.props.getMusic({
          userID: this.props.userID,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        });
      },
      e => {
        console.log(e);
      },
      { timeout: 20000 }
    );
  }
  render() {
    return (
      <MusicWrapper>
        <h1>Welcome to the Music</h1>
      </MusicWrapper>
    );
  }
}

const mapStateToProps = state => ({
  userID: state.login.loggedInUser._id
});

const mapDispatchToProps = (dispatch: Dispatch<*>): Object => ({
  getMusic: payload => dispatch(getMusic(payload))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Music)
);
