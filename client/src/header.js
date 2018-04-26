import React from 'react';
import {Button}  from 'react-bootstrap';
import './header.css';

class Header extends React.Component {

   constructor(props){
       super(props);
       this.state = {


       }
   }


   render(){
      return(
        <div className='header-global'>  
        <h3> Vote up, creat a poll or vote an existing one! </h3>
        <div className='header-body'>
        
        <Button bsStyle="default" >  Sign In </Button>
        <Button bsStyle="default" >  Poll list </Button> 
        </div>
        </div>)


   }
}

export default Header;