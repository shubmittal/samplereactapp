import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like"

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  deleteMovie = id => {
    const movies = this.state.movies.filter(item => item._id !== id);
    this.setState({ movies });
  };

  toggleLike = (movie) =>
      {
       
        let movies = this.state.movies;
       const index = this.state.movies.indexOf(movie);
       movies[index].like = !(movies[index].like);
       this.setState({movies});
      }

  render() {
      const {length:nummovies} = this.state.movies;

      if (nummovies == 0) return <p>There are no movies in the database</p>

    return (
      <div>
        {nummovies >0 && <h1> Showing {this.state.movies.length} movies from database</h1>}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col">Like</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(item => {
              return (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.genre.name}</td>
                  <td>{item.numberInStock}</td>
                  <td>{item.dailyRentalRate}</td>
                  <td><Like like = {item.like} onToggle ={() => this.toggleLike(item)}></Like></td>
                  <td>
                    <button
                      id={item._id}
                      className="btn btn-small btn-danger"
                      onClick={() => this.deleteMovie(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Movies;
