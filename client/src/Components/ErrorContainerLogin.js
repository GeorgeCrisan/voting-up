import React, {Component} from 'react';
import './errorcontainerlogin.css';

class ErrorContainerLogin extends Component {

  render(){
       return(<h1>Error! User could not be found or password is wrong. Check your credentials 
        and try again or create a new user.</h1>);
  }
}

export default ErrorContainerLogin;