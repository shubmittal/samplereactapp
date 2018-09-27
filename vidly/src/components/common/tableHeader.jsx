import React, { Component } from "react";
import propTypes from "prop-types";

class TableHeader extends Component {

    raiseSort = path => {
        let sortColumn = this.props.sortColumn;
        if (sortColumn.path === path) {
          sortColumn.order = (sortColumn.order === "asc") ? "desc" : "asc";
        } else {
          sortColumn.path = path;
          sortColumn.order = "asc"
        }
        this.props.onSort(sortColumn);
      };

      renderSortIcon = path => {
        let sortColumn = this.props.sortColumn;
        if (sortColumn.path === path) {
          let order = sortColumn.order;
          const className = (order === "asc") ? "fa fa-sort-asc" : "fa fa-sort-desc";
          return <i className = {className}/>
        } 
        return null;
      }

  render() {
    return(        
   <thead>
      <tr>
        {this.props.columns.map(column => 
            <th className = "clickable" scope="col" onClick={() => this.raiseSort(column.path)} key = {column.path || column.key}>
            {column.label}{this.renderSortIcon(column.path)}
          </th>
        )}
      </tr>
      </thead>
   
    )
  }
}

TableHeader.propTypes = {
  columns: propTypes.array.isRequired,
  sortColumn :propTypes.object.isRequired,
  onSort: propTypes.func.isRequired
};

export default TableHeader;

