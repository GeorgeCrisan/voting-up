import React from 'react';
import {Button}  from 'react-bootstrap';
import './header.css';

class Header extends React.Component {

   constructor(props){
       super(props);
       this.state = {


       }
       this.fetchDataPoll = this.fetchDataPoll.bind(this);
   }

   fetchDataPoll(e){
        e.preventDefault();
        fetch('/allpolls',{
             method:'POST',
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
             }
        }).then((response)=>{
           // console.log(data);
           response.json().then((data)=>{
    console.log(data);


           })
        });
   }



   render(){
      return(
        <div className='header-global'>  
        <h3> Vote up, creat a poll or vote an existing one! </h3>
        <div className='header-body'>
        
        <Button bsStyle="default" >  Sign In </Button>
        <Button bsStyle="default" onClick={this.fetchDataPoll} >  Poll list </Button> 
        </div>
        </div>)


   }
}

export default Header;