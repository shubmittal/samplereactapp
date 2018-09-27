import React, { Component } from "react";
import Like from "../components/common/like";
import propTypes from "prop-types";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    { label: "Title", path: "title" },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rate", path: "dailyRentalRate" },
    {
      key: "like",
      content: item => (
        <Like like={item.like} onToggle={() => this.props.toggleLike(item)} />
      )
    },
    {
      key: "delete",
      content: item => (
        <button
          id={item._id}
          className="btn btn-small btn-danger"
          onClick={() => this.props.onDelete(item._id)}
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
        data={movies}
      />
    );
  }
}

MoviesTable.propTypes = {
  movies: propTypes.array.isRequired,
  toggleLike: propTypes.func.isRequired,
  onDelete: propTypes.func.isRequired,
  onSort: propTypes.func.isRequired
};

export default MoviesTable;
