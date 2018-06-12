import React, {Component} from 'react';
import './errorcontainerlogin.css';

class ErrorContainerCA extends Component {
     constructor(props){
         super(props);
     }

  render(){
       return(<h1>User already existend. Try to login with your credentials or create a new account.</h1>);
  }
}

export default ErrorContainerCA;