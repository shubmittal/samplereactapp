import React from "react";
import Joi from "joi";
import Form from "./common/form";
import { login } from "../services/loginService";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(3)
      .label("Password")
  };

  doSubmit = async () => {
    const email = this.state.data.email;
    const password = this.state.data.password;
    try {
    await login({ email, password });    
    window.location = "/"
    } catch (ex) {

      if(ex.response && ex.response.status === 400)
      {
        const errors = this.state.errors;
        errors["email"] = ex.response.data
        this.setState({errors})


      }
    }
  };

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        {this.renderInput("email", "Email")}
        {this.renderInput("password", "password", "Password")}
        {this.renderButton("Submit")}
      </form>
    );
  }
}

export default LoginForm;
