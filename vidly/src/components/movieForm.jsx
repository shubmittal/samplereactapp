import React from "react";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Form from "./common/form";
import Joi from "joi";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: 0,
      dailyRentalRate: 0
    },
    errors: {},
    genres: []
  };
  schema = {
    _id: Joi.string()
      .allow("")
      .optional(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Rental rate")
  };

  doSubmit() {
    const movie = this.state.data;
    saveMovie(movie);
    this.props.history.push("/movies");
  }

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });
    let movieId = this.props.match.params.id;
    if (movieId === "new") return;
    let movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    const movieViewModel = {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };

    return movieViewModel;
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        {this.renderInput("title", "Title")}
        {this.renderDropDown("genreId", "Genre", this.state.genres)}
        {this.renderInput("numberInStock", "Stock", "number")}
        {this.renderInput("dailyRentalRate", "Rate", "number")}
        {this.renderButton("Submit")}
      </form>
    );
  }
}

export default MovieForm;
