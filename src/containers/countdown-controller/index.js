import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import { Select, TextField } from "redux-form-material-ui";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withStyles } from "@material-ui/core/styles";
import {
  getElapsedTimeInSeconds,
  getIsComplete,
  getIsElapsing,
  getIsStopped,
  getIsPaused,
  getTimerDuration,
  getPrettyTime
} from "../../redux/modules/countdown/selectors";
import {
  pauseCountdown,
  resetCountdown,
  startCountdown
} from "../../redux/modules/countdown/action-creators";
import styles from "./countdown-controller.style";

let PomodoroDurationLengthSelector = () => (
  <form>
    <Field name="duration" component={Select} placeholder="Select a time">
      <MenuItem aria-label="Focus" value="focus">Focus</MenuItem>
      <MenuItem aria-label="Short break" value="short-break">Short Break</MenuItem>
      <MenuItem aria-label="Long break" value="long-break">Long Break</MenuItem>
    </Field>
  </form>
);

PomodoroDurationLengthSelector = reduxForm({ form: "currentDurationLengthForm" })(PomodoroDurationLengthSelector);

let TaskTextField = () => (
  <form>
    <Field
      name="taskName"
      component={TextField}
      inputProps={{
        "aria-label": "Task name"
      }}
      InputLabelProps={{
             shrink: true,
           }}
      placeholder="Task Name"
      fullWidth
      margin="normal"
    />
  </form>
);

TaskTextField = reduxForm({ form: "currentDurationLengthForm" })(TaskTextField);

// eslint-disable-next-line react/prefer-stateless-function
class CountdownController extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
    elapsedTimeInSeconds: PropTypes.number.isRequired,
    isElapsing: PropTypes.bool.isRequired,
    isPaused: PropTypes.bool.isRequired,
    pauseCountdown: PropTypes.func.isRequired,
    resetCountdown: PropTypes.func.isRequired,
    startCountdown: PropTypes.func.isRequired,
    timerDuration: PropTypes.number.isRequired,
    prettyTime: PropTypes.string.isRequired
  };

  state = {
    expanded: false
  };

  handleExpandClick = () => {
    this.setState((prevState) => ({ expanded: !prevState.expanded }));
  };

  render() {
    const { classes } = this.props;
    const timePercentage = (this.props.elapsedTimeInSeconds / this.props.timerDuration) * 100;
    const totalTimeLeft = this.props.timerDuration - this.props.elapsedTimeInSeconds;

    // Disable the button if the timer is running or if the timer has expired
    const startButtonIsDisabled = this.props.isElapsing || (totalTimeLeft === 0);
    const pauseButtonIsDisabled = this.props.isPaused || !this.props.isElapsing;

    return (
      <div>
        <div>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <TaskTextField />
              }
              action={
                <IconButton aria-label="More" >
                  <MoreVertIcon />
                </IconButton>
              }
              // TODO: (bdietz) - Need to wire this into the TaskText Field
              title=""
              // TODO: (bdietz) - Figure out what could go here
              subheader=""
            />
            <CardContent className={classes.cardContent}>
              <Typography variant="display4">
                {this.props.prettyTime}
              </Typography>
              <LinearProgress
                className={classes.progressIndicator}
                variant="determinate"
                value={timePercentage}
              />
            </CardContent>
            <CardActions>
              <Button
                aria-label="Start"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.props.startCountdown}
                disabled={startButtonIsDisabled}
              >
                Start
              </Button>
              <Button
                aria-label="Pause"
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={this.props.pauseCountdown}
                disabled={pauseButtonIsDisabled}
              >
                Pause
              </Button>
              <Button
                aria-label="Reset"
                variant="contained"
                className={classes.button}
                onClick={this.props.resetCountdown}
              >
                Reset
              </Button>
              <PomodoroDurationLengthSelector />
              <IconButton
                aria-label="Show more"
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph variant="body2">
                  Method:
                </Typography>
                <Typography paragraph>
                  Need to get this shit done
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  elapsedTimeInSeconds: getElapsedTimeInSeconds(state),
  isComplete: getIsComplete(state),
  isElapsing: getIsElapsing(state),
  isPaused: getIsPaused(state),
  isStopped: getIsStopped(state),
  timerDuration: getTimerDuration(state),
  prettyTime: getPrettyTime(state)
});

const mapDispatchToProps = (dispatch) => ({
  startCountdown: () => dispatch(startCountdown()),
  pauseCountdown: () => dispatch(pauseCountdown()),
  resetCountdown: () => dispatch(resetCountdown())
});

export default connect(mapStateToProps, mapDispatchToProps)
(withStyles(styles)(CountdownController));