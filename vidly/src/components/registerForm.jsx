import React from 'react';
import Form from './common/form';
import Joi from 'joi'
import { registerUser } from '../services/userService';
import {loginWithJWT} from '../services/loginService'


class RegisterForm extends Form {
    state = { 
        data : {email: "", password: "", name : ""},
        errors : {}
     };
     schema = {
         "email": Joi.string().email().required().label("Email"),
         "password" : Joi.string().min(5).max(30).required().label("Password"),
         "name" : Joi.string().min(5).required().label("Name")
     };
     doSubmit= async () =>
     {
         
        try{
            let result = await registerUser(this.state.data);
         console.log(result)
         loginWithJWT(result.headers["x-auth-token"])
         window.location = "/"
        
        }
         catch(ex)
         {
             
            if(ex.response && ex.response.status === 400)
            {
                const errors = this.state.errors;
                errors.username = "This user is already registered"
                this.setState({errors})
            }
         }
     }
    render() { 
        return ( 
           <form onSubmit={e => this.handleSubmit(e)}>
           {this.renderInput("email", "Email")}
           {this.renderInput("password", "Password", "password")}
           {this.renderInput("name", "Name")}
           {this.renderButton("Submit")}
           </form>
         );
    }
}
 
export default RegisterForm;