import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "react-prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { actionCreators, selectors } from "../../redux/modules/countdown";

const styles = theme => ({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

// eslint-disable-next-line react/prefer-stateless-function
class ContainedButtons extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <div>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="headline" component="h2">
                {this.props.counter}
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
              <Button variant="contained" color="secondary" className={classes.button}>
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
  counter: PropTypes.number.isRequired,
  startCountdown: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  counter: selectors.getTimeInSeconds(state)
});

const mapDispatchToProps = (dispatch) => ({
  startCountdown: () => dispatch(actionCreators.startCountdown())
});

export default connect(mapStateToProps, mapDispatchToProps)
(withStyles(styles)(ContainedButtons));