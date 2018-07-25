import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { actionCreators, selectors } from "../../redux/modules/countdown";

const styles = theme => ({
  card: {
    minWidth: 275
  },
  cardContent: {
    textAlign: "center"
  },
  button: {
    margin: theme.spacing.unit
  }
});

// eslint-disable-next-line react/prefer-stateless-function
class ContainedButtons extends Component {
  render() {
    const { classes } = this.props;
    const totalTimeLeft = this.props.timerDuration - this.props.elapsedTimeInSeconds;
    const totalMinutesLeft = Math.floor(totalTimeLeft / 60);
    const secondToSubtract = this.props.elapsedTimeInSeconds % 60;
    const seconds = (60 - secondToSubtract) % 60;

    return (
      <div>
        <div>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="display4">
                {totalMinutesLeft < 10 ? `0${totalMinutesLeft}` : totalMinutesLeft}:{seconds < 10 ? `0${seconds}` : seconds}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.props.startCountdown}
              >
                Start
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={this.props.stopCountdown}
              >
                Stop
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

ContainedButtons.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  elapsedTimeInSeconds: PropTypes.number.isRequired,
  timerDuration: PropTypes.number.isRequired,
  startCountdown: PropTypes.func.isRequired,
  stopCountdown: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  elapsedTimeInSeconds: selectors.getElapsedTimeInSeconds(state),
  timerDuration: selectors.getTimerDuration(state)
});

const mapDispatchToProps = (dispatch) => ({
  startCountdown: () => dispatch(actionCreators.startCountdown()),
  stopCountdown: () => dispatch(actionCreators.countdownTerminated())
});

export default connect(mapStateToProps, mapDispatchToProps)
(withStyles(styles)(ContainedButtons));