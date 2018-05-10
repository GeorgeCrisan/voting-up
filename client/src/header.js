import React from 'react';
import {Button}  from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './header.css';

class Header extends React.Component {

   constructor(props){
       super(props);
   }

 

   

   render(){
if(!this.props.userIsLogged){
         return(
            <div className='header-global'>  
                <h3> Vote up! Create polls! </h3>
               <div className='header-body'>
               
               <Link to='/authSignIn'><Button bsStyle="info" onClick={this.props.handleShow} >  Sign In </Button></Link>
               <Link to='/polls'><Button bsStyle="info"  >  Poll list </Button> </Link>
               <Link to='/authCA' > <Button bsStyle='warning' onClick={this.props.handleShow}> Create Account</Button></Link>
               </div>
            </div>)
         }  else if (this.props.userIsLogged){
            return(
                <div className='header-global'>  
                    <h3> Vote up! Create polls! </h3>
                   <div className='header-body'>
                   
                   <Link to='/signout'><Button bsStyle="danger"  >  Sign Out </Button></Link>
                   <Link to='/polls'><Button bsStyle="info"  >  Poll list </Button> </Link>
                   
                   </div>
                </div>)

         }
           
      


   }
}

export default Header;