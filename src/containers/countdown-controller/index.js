import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import red from "@material-ui/core/colors/red";
import { Select } from "redux-form-material-ui";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { withStyles } from "@material-ui/core/styles";
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
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

let PomodoroDurationLengthSelector = () =>(
  <form>
    <Field name="plan" component={Select} placeholder="Select a time">
      <MenuItem value="focus">Focus</MenuItem>
      <MenuItem value="short-break">Short Break</MenuItem>
      <MenuItem value="long-break">Long Break</MenuItem>
    </Field>
  </form>
);

PomodoroDurationLengthSelector = reduxForm({ form: "currentDurationLengthForm" })(PomodoroDurationLengthSelector);

// eslint-disable-next-line react/prefer-stateless-function
class CountdownController extends Component {
  state = {
    expanded: false
  };

  handleExpandClick = () => {
    this.setState((prevState) => ({ expanded: !prevState.expanded }));
  };

  render() {
    const { classes } = this.props;
    const totalTimeLeft = this.props.timerDuration - this.props.elapsedTimeInSeconds;
    const totalMinutesLeft = Math.floor(totalTimeLeft / 60);
    const secondToSubtract = this.props.elapsedTimeInSeconds % 60;
    const seconds = this.props.timerDuration < 60
      ? this.props.timerDuration - this.props.elapsedTimeInSeconds
      : (60 - secondToSubtract) % 60;

    // Disable the button if the timer is running or if the timer has expired
    const startButtonIsDisabled = this.props.isElapsing || (totalTimeLeft === 0);
    const pauseButtonIsDisabled = this.props.isPaused || !this.props.isElapsing;

    return (
      <div>
        <div>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="User" className={classes.avatar}>
                  BD
                </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title="Working hard"
              subheader="July 23, 2018"
            />
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
                disabled={startButtonIsDisabled}
              >
                Start
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={this.props.pauseCountdown}
                disabled={pauseButtonIsDisabled}
              >
                Pause
              </Button>
              <Button
                variant="contained"
                className={classes.button}
                onClick={this.props.resetCountdown}
              >
                Reset
              </Button>
              <PomodoroDurationLengthSelector />
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
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

CountdownController.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  elapsedTimeInSeconds: PropTypes.number.isRequired,
  isElapsing: PropTypes.bool.isRequired,
  isPaused: PropTypes.bool.isRequired,
  pauseCountdown: PropTypes.func.isRequired,
  resetCountdown: PropTypes.func.isRequired,
  startCountdown: PropTypes.func.isRequired,
  timerDuration: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  elapsedTimeInSeconds: selectors.getElapsedTimeInSeconds(state),
  isComplete: selectors.getIsComplete(state),
  isElapsing: selectors.getIsElapsing(state),
  isStopped: selectors.getIsStopped(state),
  timerDuration: selectors.getTimerDuration(state)
});

const mapDispatchToProps = (dispatch) => ({
  startCountdown: () => dispatch(actionCreators.startCountdown()),
  pauseCountdown: () => dispatch(actionCreators.pauseCountdown()),
  resetCountdown: () => dispatch(actionCreators.resetCountdown())
});

export default connect(mapStateToProps, mapDispatchToProps)
(withStyles(styles)(CountdownController));