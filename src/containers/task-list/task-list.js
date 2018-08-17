import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EnhancedTableHead from "./enhanced-table-head";
import EnhancedTableToolbar from "./enhanced-table-toolbar";

let counter = 0;

function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: "asc",
      data: [
        createData("Cupcake", 305, 3.7, 67, 4.3),
        createData("Donut", 452, 25.0, 51, 4.9),
        createData("Eclair", 262, 16.0, 24, 6.0),
        createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
        createData("Gingerbread", 356, 16.0, 49, 3.9),
        createData("Honeycomb", 408, 3.2, 87, 6.5),
        createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
        createData("Jelly Bean", 375, 0.0, 94, 0.0),
        createData("KitKat", 518, 26.0, 65, 7.0),
        createData("Lollipop", 392, 0.2, 98, 0.0),
        createData("Marshmallow", 318, 0, 81, 2.0),
        createData("Nougat", 360, 19.0, 9, 37.0),
        createData("Oreo", 437, 18.0, 63, 4.0)
      ],
      page: 0,
      rowsPerPage: 5
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleClick = (event, id) => {
    this.setState({ selected: id });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected === id;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell component="th" scope="row">
                        {n.name}
                      </TableCell>
                      <TableCell numeric>{n.calories}</TableCell>
                      <TableCell numeric>{n.fat}</TableCell>
                      <TableCell numeric>{n.carbs}</TableCell>
                      <TableCell numeric>{n.protein}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);