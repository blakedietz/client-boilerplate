import React from "react";
import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";

const columnData = [
  { id: "name", numeric: false, disablePadding: false, label: "Dessert (100g serving)" },
  { id: "calories", numeric: true, disablePadding: false, label: "Calories" },
  { id: "fat", numeric: true, disablePadding: false, label: "Fat (g)" },
  { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
  { id: "protein", numeric: true, disablePadding: false, label: "Protein (g)" }
];
class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => (
            <TableCell
              key={column.id}
              numeric={column.numeric}
              padding="default"
              sortDirection={orderBy === column.id ? order : false}
            >
              <Tooltip
                title="Sort"
                placement={column.numeric ? "bottom-end" : "bottom-start"}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ), this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};

export default EnhancedTableHead;