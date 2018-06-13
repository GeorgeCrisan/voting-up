import React from 'react';
import {Button}  from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './header.css';

class Header extends React.Component {

   constructor(props){
       super(props);

       this.runLogOut = this.runLogOut.bind(this);

   }
   
   runLogOut(){
    this.props.confirmLogOut();

  
}

   render(){
if(!this.props.userIsLogged){
         return(
            <div className='header-global'>  
                <h3> Vote up! Create polls! </h3>
               <div className='header-body'>
               <Link to='/polls'><Button className='defaultButton'  >  Polls list </Button> </Link>
               <Link to='/register' > <Button className='defaultButton' onClick={this.props.handleShow}> Create Account</Button></Link>
               <Link to='/authSignIn'><Button className='SignInButton' onClick={this.props.handleShow} >  Sign In </Button></Link>
               
               </div>
            </div>)
         }  else if (this.props.userIsLogged){
            return(
                <div className='header-global'>  
                    <h3> Vote up! Create polls! </h3>
                   <div className='header-body'>
                   <Link to='/polls'><Button bsStyle="info" className='defaultButton'  >  Poll list </Button> </Link>
                   <Link to='/mypolls'><Button bsStyle="info" className='defaultButton' > My Polls </Button></Link>
                   <Link to='/createnewpoll'><Button bsStyle="info" className='defaultButton'  onClick={this.props.handleShow}> Create Poll </Button></Link>
                   <Link to='/'><Button  className='SignOutButton'  onClick={this.runLogOut} >  Sign Out </Button></Link>
                   </div>
                </div>)

         }
           
      


   }
}

export default Header;