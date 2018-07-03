import React from 'react';
import { Button , Modal } from 'react-bootstrap';
import * as d3 from 'd3';
import mgdpng from './mgb.png';
import rjspng from './rjs.png';
import njpng from './nodejs.png';



class ModalPoll extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.renderChart = this.renderChart.bind(this);
      this.votedNowRender = this.votedNowRender.bind(this);
  
  
      this.state = {
        
        show: true,
        voted: false,
  
  
      };
    }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true , voted: false});
    }
   
  
  
  
    votedNowRender(event){
      let index = this.props.orderMe;
       let i = Number(event.target.id);

       let tempArray = this.props.elementoptions;
       tempArray[i].votes += 1;
  
       this.props.updatedParentAndDB(index);
      this.renderChart();
    }
     
    renderChart(){
        
  
        let chart = d3.select('#chart');
        let data = this.props.elementoptions;
        let width = 570;
        let xScale = d3.scaleLinear()
                       .domain([0, d3.max(data,d=>d.votes)])
                       .range([0,width]);
        chart.selectAll('.bar').remove();
        let bars = chart.selectAll('.bar')
                        .data(data)
                        .enter()
                        .append('div')
                        .attr('class','bar');
                        
                        
        bars.append('div').attr('class', 'vote')
            .transition()
            .delay(1400)
            .duration(1000)
            .text((d, i) => {
             return ( d.optionBody  + ' - ' + d.votes); 
            });
            
        bars
            .style('top', (d, i) => i * 50 + 30 + 'px')
            .style('height', '10px')
            .style('width', '0px')
            .transition()
            .delay(500)
            .duration(1000)
            .style('width', d => xScale(d.votes) + 'px');   
            
            this.setState({voted: true});
    }
  
    render() {
  
      return (
        <div>
  
          <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
            Open 
          </Button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.elementname}</Modal.Title>
              
            </Modal.Header>
            <Modal.Body className='poll-detail'>
  
              {
                
                this.state.voted ? false :
                this.props.elementoptions.map((el,i)=>{
  
                  
                   return(<a key={i + 1}>
                    <div className='optionsToClick' id={i} refs={i} style={(!(i % 2)) ? {backgroundColor: '#5D6D7E'}:{backgroundColor: '#212F3C'}  } onClick={this.votedNowRender}>
                      <div id={'0000' + i}> <p id={'0' + i}>Option {i+1}:</p>  <p id={'00' + i}>{el.optionBody}</p></div>
  
                   </div>
                   </a>)
  
              }) }
              <div className="chartvotes" id="chart" ref="chart"></div>
  
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }


 class SharedPoll extends React.Component {
       constructor(props,context){
           super(props,context);
           this.state = {
               datanow: [],
               id: "",
               alldata: []

           }

           this.runinrender = this.runinrender.bind(this);
           this.updatedParentAndDB = this.updatedParentAndDB.bind(this);
       }
     
       componentDidMount() {
        fetch('/allpolls',{
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
             }
        }).then((response)=>{
    
             response.json().then((data)=>{
                  let dataToStay = [];
                  for(let i = 0; i < data.length; i++){
                         if(data[i]._id === this.props.match.params.id){
                             dataToStay.push(data[i]);
                         }
                  }
                  this.setState({datanow: dataToStay, id: this.props.match.params.id, alldata: data});
    
             });
    
        }).catch(error=>{
            console.log(error + ' Try again!');
        });
       }


       

       updatedParentAndDB( index){
        let dataToUpdate = this.state.datanow[index];
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
                
                 
           res.json().then((dataV)=>{

               let alldata = Object.assign({},this.state.alldata); 
               for(let i = 0; i < alldata.length; i++){
                     if(alldata[i].question === dataV.question){
                         Object.assign(alldata[i],dataV);

                     }

               }

               this.props.UpdateParent(alldata);
           });  
       });  
}



runinrender(){
   let data = this.state.datanow;
   
  return  data.map((element,i) => {
     return (<div key={'5'+ i} className='entry-page'>

     <div className='logos-icons'>

     <img src={mgdpng} className='logo-style' alt='logo img node react express mongodb'/>
     <div  className='logo-style' alt=''>ExpressJs</div>
     <img src={rjspng} className='logo-style' alt='logo img node react express mongodb'/>
     <img src={njpng} className='logo-style' alt='logo img node react express mongodb'/>

     </div>
     
     <div className='infos-style'>
               
              <p>Take part on other users polls.</p>
             <p>You can create an acount for free and create your own poll.</p>
             
             <p>This application is build by George Crisan at georgerdp@gmail.com.</p>
             <p>Node, Express, ReactJS, Mongoose.</p>
         </div>
         <div key={i} className='elementPollSecret'>
            <ul>
               <li>Poll Title: <p> {element.question}</p></li>
               <li>Created by: <p>{element.createdBy}</p> </li>
               
               <li><ModalPoll orderMe={i} updatedParentAndDB={this.updatedParentAndDB} elementname={element.question} userid={element.createdBy} elementoptions={element.options} elementvotes={element.options.votes}/></li>
            </ul>
            
     </div>
         </div>
         
        
        
        
        )
    });
     
}

render() {


return (
 <div className="bodyapp2">
     {this.runinrender()}
     
 </div>
);




}  
     
}

export default SharedPoll;