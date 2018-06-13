import React, { Component } from 'react';
import './allpolls.css';
import ModalPoll from './Components/pollelement.js';



 


class AllPollsComponent extends Component {
     constructor(props){
       super(props);
       this.state = {
          loadedPolls: [],
          selected: null
       }

       this.runinrender = this.runinrender.bind(this);
       this.fetchData = this.fetchData.bind(this);
       this.updatedParentAndDB = this.updatedParentAndDB.bind(this);
     }  
       fetchData(){

       }

       updatedParentAndDB( index){
               let dataToUpdate = this.state.loadedPolls[index];
              fetch('/updatePolls',{
                method: 'POST',
                headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToUpdate)
              }).then(res=>{
                  if(res.status === 401){
                    console.log('Nasty error from server');
                  }
                       
                        
                  res.json().then((data)=>{
                    return;
                  });  
              });  
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
                      <li>Poll Title: <p> {element.question}</p></li>
                      <li>Created by: <p>{element.createdBy}</p> </li>
                      <li><ModalPoll orderMe={i} updatedParentAndDB={this.updatedParentAndDB} elementname={element.question} userid={element.createdBy} elementoptions={element.options} elementvotes={element.options.votes}/></li>
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
