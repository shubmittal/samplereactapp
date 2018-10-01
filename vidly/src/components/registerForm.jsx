import React from 'react';
import Form from './common/form';
import Joi from 'joi'

class RegisterForm extends Form {
    state = { 
        data : {username: "", password: "", name : ""},
        errors : {}
     };
     schema = {
         "username": Joi.string().email().required().label("Username"),
         "password" : Joi.string().min(5).max(30).required().label("Password"),
         "name" : Joi.string().min(5).required().label("Name")
     };
     doSubmit= () =>
     {
         alert("registerred")
     }
    render() { 
        return ( 
           <form onSubmit={e => this.handleSubmit(e)}>
           {this.renderInput("username", "Username")}
           {this.renderInput("password", "Password", "password")}
           {this.renderInput("name", "Name")}
           {this.renderButton("Submit")}
           </form>
         );
    }
}
 
export default RegisterForm;