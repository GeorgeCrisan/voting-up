import React, {Component} from 'react';
import './errornotauthorized.css';

class ErrorUnauthorized extends Component {
     constructor(props){
         super(props);
     }

     componentDidMount(){
         this.props.logout();
     }

  render(){
       return(<h1>Error! You are no authorized! Please log in!</h1>);
  }
}

export default ErrorUnauthorized;