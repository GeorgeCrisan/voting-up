
import React, {Component} from 'react';
import * as d3 from 'd3';
import ModalPoll from './Components/pollelement.js';
import './mypolls.css';

class PresentMyPollsComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            loadedMyPolls: [],
            redirectError: false
        }
       
        this.runinrender = this.runinrender.bind(this);
    }


    componentDidMount(){
        fetch('/mypolls',{
          method: 'GET',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': this.props.token 
           }
      }).then((response)=>{
           
        if(response.status === 401){
            this.setState({redirectError: true});

         } else {
            response.json().then((data)=>{ 
  
                this.setState({loadedMyPolls: data});
  
           });

         }
  
          
  
      }).catch(error=>{
          console.log(error + ' Try again!');
      });
       }
      
       runinrender(){
        let data = this.state.loadedMyPolls;
       return  data.map((element,i) => {
          return (<div key={i} className='elementPoll'>
                 <ul>
                    <li>Poll Title: <p> {element.question}</p></li>
                    <li>Created by: <p>{element.createdBy}</p> </li>
                    <li><ModalPoll orderMe={i}  elementname={element.question} userid={element.createdBy} elementoptions={element.options} elementvotes={element.options.votes}/></li>
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


export default PresentMyPollsComponent;