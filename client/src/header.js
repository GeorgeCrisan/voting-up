import React from 'react';
import {Button}  from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './header.css';

class Header extends React.Component {

   constructor(props){
       super(props);
   }

 

   

   render(){
      return(
        <div className='header-global'>  
        <h3> Vote up, creat a poll or vote an existing one! </h3>
        <div className='header-body'>
        
        <Link to='/auth'><Button bsStyle="default" >  Sign In </Button></Link>
        <Link to='/polls'><Button bsStyle="default" onClick={this.props.buttonEpFunc} >  Poll list </Button> </Link>
        </div>
        </div>)


   }
}

export default Header;