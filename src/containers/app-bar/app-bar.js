import React from "react";
import PropTypes from "react-prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import styles from "./app-bar.style";

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" />
          <Typography variant="title" color="inherit" className={classes.flex}>
            flood.ink
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.shape({
    classes: PropTypes.shape({
      menuButton: PropTypes.object,
      flex: PropTypes.object
    })
  }).isRequired
};

export default withStyles(styles)(ButtonAppBar);