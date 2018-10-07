import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "../components/common/pagination";
import MoviesTable from "../components/moviesTable";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/genreService";
import ListGroup from "../components/common/listgroup";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 3,
    currentPage: 1,
    currentGenre: "",
    searchString: "",
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount = async () => {
    let { data: allGenres } = await getGenres();
    let { data: movies } = await getMovies();
    const genres = [{ name: "All Genres", _id: -1 }, ...allGenres];

    this.setState({
      movies,
      genres
    });
  };

  deleteMovie = async id => {
    const originalState = this.state.movies;
    const movies = this.state.movies.filter(item => item._id !== id);
    this.setState({ movies });
    try {
      await deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("An error occured");
      }
      this.setState({ movies: originalState });
    }
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
    this.setState({ currentGenre: genre, currentPage: 1, searchString: "" });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = searchString => {
    this.setState({ currentGenre: "", currentPage: 1, searchString });
  };

  getFilteredData() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      currentGenre,
      sortColumn,
      searchString
    } = this.state;

    const filteredMovies =
      currentGenre && currentGenre._id !== -1
        ? allMovies.filter(m => m.genre._id === currentGenre._id)
        : searchString !== ""
          ? allMovies.filter(
              m =>
                m.title.toUpperCase().search(searchString.toUpperCase()) !== -1
            )
          : allMovies;

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);

    return { filteredLength: sorted.length, data: movies };
  }

  render() {
    const { length: nummovies } = this.state.movies;

    const {
      pageSize,
      currentPage,
      genres,
      currentGenre,
      sortColumn,
      searchString
    } = this.state;
    const { user } = { ...this.props };

    const { filteredLength, data: movies } = this.getFilteredData();

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

          {user && (
            <Link
              className="btn btn-primary m-2"
              to={{ pathname: `/movies/new` }}
            >
              Add Movie
            </Link>
          )}

          <SearchBox onChange={this.handleSearch} value={searchString} />

          <MoviesTable
            movies={movies}
            toggleLike={this.toggleLike}
            onDelete={this.deleteMovie}
            onSort={this.handleSort}
            sortColumn={sortColumn}
            editMovie={this.editMovie}
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
