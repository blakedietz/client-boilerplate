import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../app-bar";
import CountDownController from "../countdown-controller";
import withRoot from "../../utilities/with-root";

const styles = theme => ({
  root: {
    flex: 1
  },
  site: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column"
  }
});

// eslint-disable-next-line react/prefer-stateless-function
class RootContainer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <AppBar position="sticky" />
          <main className={classes.site}>
            <Paper>
              <CountDownController />
            </Paper>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

RootContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};
RootContainer.defaultProps = {};

const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRoot(withStyles(styles)(RootContainer))
);
