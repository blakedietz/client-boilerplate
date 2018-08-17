import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedTableToolbar = props => {
  const { classes } = props;

  return (
    <Toolbar>
      <div className={classes.title}>
        <Typography variant="title" id="tableTitle">
          Tasks
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title="Filter list">
          <IconButton aria-label="Filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired
};

export default EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

