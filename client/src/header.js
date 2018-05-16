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
     return   this.props.confirmLogOut;

     fetch('/logout',{
        method:'POST',
        headers:{
         'Accept': 'application/json',
         'Content-Type': 'application/json',
        }
    }).then(res=>{
        res.json().then((datares)=>{
              console.log(datares);
        });
   });

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
                   
                   <Button bsStyle="danger" onClick={this.runLogOut()} >  Sign Out </Button>
                   <Link to='/polls'><Button bsStyle="info"  >  Poll list </Button> </Link>
                   
                   </div>
                </div>)

         }
           
      


   }
}

export default Header;