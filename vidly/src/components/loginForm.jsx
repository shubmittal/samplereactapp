import React from "react";
import Joi from "joi";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(3)
      .label("Password")
  };
  

doSubmit = () => {
    const username = this.state.data.username;
    const password = this.state.data.password;

    console.log(username, password);
    alert("submitted")

}



  render() {
    
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        {this.renderInput("username", "Username" )}
        {this.renderInput("password","password", "Password" )}
        {this.renderButton("Submit")}

       
      </form>
    );
  }
}

export default LoginForm;
