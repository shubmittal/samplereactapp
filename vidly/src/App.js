import React, { Component } from "react";

import {Switch, Route, Redirect} from 'react-router-dom'

import Movies from "./components/movies";
import NavBar from "./components/navbar";

import Rentals from "./components/rentals";
import Customers from "./components/customers"
import NotFound from "./components/notfound";
import MovieForm from "./components/movieForm"
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout"

import ProtectedRoute from "./components/common/protectedRoute"

import "./App.css";
import { getCurrentUser } from "./services/loginService";


class App extends Component {

  state = {}
  componentDidMount() {
    const user = getCurrentUser()  
    this.setState({user})  
   
  }


  render() {
    return (
      <React.Fragment>
        <NavBar user = {this.state.user} />
        <main className="container">
          <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
           <ProtectedRoute path="/movies/:id" component = {MovieForm}/>       
           <Route path="/movies" component = {Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        
        </main>
      </React.Fragment>
    )
    
  }
}

export default App;
