import React, { Component } from 'react';
import './bodyapp.css';
import ModalPoll from './Components/pollelement.js';






class BodyApp extends Component {
     constructor(props){
       super(props);

       this.runinrender = this.runinrender.bind(this);
     }  

     runinrender(){
          let data = this.props.pollPosts;
         return  data.map((element,i) => {
            return (<div key={i} className='elementPoll'>
                   <ul>
                      <li>Poll Name:<span> {element.name}</span></li>
                      <li>Created by: <span>{element._id}</span> </li>
                      <li><ModalPoll elementname={element.name} userid={element._id} elementoptions={element.options}/></li>
                   </ul>
                   
            </div>)
           });
            
     }

  render() {

    
      return (
        <div className="bodyapp">
            {this.runinrender()}
            
        </div>
      );

     

    
  }
}

export default BodyApp;
