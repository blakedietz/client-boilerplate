import React, { Component } from "react";
import { connect } from "react-redux";
import AppBar from "../app-bar";

class RootContainer extends Component {
  render() {
    return (<React.Fragment>
        <AppBar/>
        <main>Content</main>
      </React.Fragment>
    );
  }
}

RootContainer.propTypes = {};
RootContainer.defaultProps = {};

const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
