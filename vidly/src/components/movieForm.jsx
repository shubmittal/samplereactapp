import React from "react";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
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

  async doSubmit() {
    const movie = this.state.data;
    try{
    await saveMovie(movie);
    this.props.history.push("/movies");
    }
    catch(ex)
    {
      
      this.props.history.push("/login")

    }
  }
  async populateGenres()
  {
    const {data:genres} = await getGenres();
    this.setState({ genres });

  }

  async populateMovie()
  {
    let movieId = this.props.match.params.id;
    if (movieId === "new") return;
    try{
      let {data:movie} = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    }
    catch(ex)
    {
       this.props.history.replace("/not-found");

    }

  }

   componentDidMount() {
     this.populateGenres()
     this.populateMovie()  
    
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
