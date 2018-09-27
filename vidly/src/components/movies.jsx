import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "../components/common/pagination";
import MoviesTable from "../components/moviesTable";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "../components/common/listgroup";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 3,
    currentPage: 1,
    currentGenre: "",
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount = () => {
    const genres = [{ name: "All Genres", _id: -1 }, ...getGenres()];

    this.setState({
      movies: getMovies(),
      genres
    });
  };

  deleteMovie = id => {
    const movies = this.state.movies.filter(item => item._id !== id);
    this.setState({ movies });
  };

  toggleLike = movie => {
    let movies = this.state.movies;
    const index = this.state.movies.indexOf(movie);
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };
  handlePageChange = page => {
    console.log(page);
    this.setState({ currentPage: page });
  };
  handleFilter = genre => {
    this.setState({ currentGenre: genre, currentPage: 1 });
  };
  handleSort = sortColumn => {
      this.setState({ sortColumn });
  };

  getFilteredData()
  {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      currentGenre,
      sortColumn
    } = this.state;
    
    const filteredMovies =
    currentGenre && currentGenre._id !== -1
      ? allMovies.filter(m => m.genre._id === currentGenre._id)
      : allMovies;

  const sorted = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);

  const movies = paginate(sorted, currentPage, pageSize);
  
  return {filteredLength: sorted.length, data: movies}

  }

  render() {
    const { length: nummovies } = this.state.movies;

    const {
      pageSize,
      currentPage,
      genres,
      currentGenre,
      sortColumn
    } = this.state;

    const {filteredLength, data:movies } = this.getFilteredData()
   

    if (nummovies === 0) return <p>There are no movies in the database</p>;
    return (
      <div className="row">
        <div className="col-4">
          <ListGroup
            items={genres}
            onItemSelected={this.handleFilter}
            selectedItem={currentGenre}
          />
        </div>
        <div className="col-8">
          {nummovies > 0 && (
            <h1> Showing {filteredLength} movies from database</h1>
          )}
          <MoviesTable
            movies={movies}
            toggleLike={this.toggleLike}
            onDelete={this.deleteMovie}
            onSort={this.handleSort}
            sortColumn = {sortColumn}
          />
          <Pagination
            itemCount={filteredLength}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
