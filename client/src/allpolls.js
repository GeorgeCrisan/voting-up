import React, { Component } from 'react';
import './allpolls.css';
import ModalPoll from './Components/pollelement.js';






class AllPollsComponent extends Component {
     constructor(props){
       super(props);
       this.state = {
          loadedPolls: []
       }

       this.runinrender = this.runinrender.bind(this);
       this.fetchData = this.fetchData.bind(this);
     }  
       fetchData(){

       }

     componentDidMount(){
      fetch('/allpolls',{
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         }
    }).then((response)=>{

         response.json().then((data)=>{

              this.setState({loadedPolls: data});

         });

    }).catch(error=>{
        console.log(error + ' Try again!');
    });
     }

     runinrender(){
          let data = this.state.loadedPolls;
         return  data.map((element,i) => {
            return (<div key={i} className='elementPoll'>
                   <ul>
                      <li>Poll Title:<span> {element.question}</span></li>
                      <li>Created by: <span>{element.createdBy}</span> </li>
                      <li><ModalPoll elementname={element.question} userid={element.createdBy} elementoptions={element.options} elementvotes={element.options.votes}/></li>
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

export default AllPollsComponent;
