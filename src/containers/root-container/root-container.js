import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import DocumentTitle from "react-document-title";
import { selectors } from "../../redux/modules/countdown";
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
  static defaultPropTypes = {};

  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
    prettyTime: PropTypes.string.isRequired
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <DocumentTitle title={this.props.prettyTime}>
          <div className={classes.root}>
            <AppBar position="sticky" />
            <main className={classes.site}>
              <Paper>
                <CountDownController />
              </Paper>
            </main>
          </div>
        </DocumentTitle>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  prettyTime: selectors.getPrettyTime(state)
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRoot(withStyles(styles)(RootContainer))
);
