
import React, {Component} from 'react';
import * as d3 from 'd3';
import './mypolls.css';
import {Popover , Button , Modal , OverlayTrigger , Tooltip} from 'react-bootstrap';


class ModalPoll extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.renderChart = this.renderChart.bind(this);
      this.votedNowRender = this.votedNowRender.bind(this);

  
      this.state = {
        
        show: false,
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
             return (i+1) + ': ' + d.optionBody  + ' Votes:    ' + d.votes; 
            });
            
        bars
            .style('top', (d, i) => i * 50 + 30 + 'px')
            .style('height', '25px')
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
  
              <h4>{this.state.voted ? 'Votes Graph:' : 'I want to vote for:'}</h4>
              {
                
                this.state.voted ? false :
                this.props.elementoptions.map((el,i)=>{

                  
                   return(<a key={i + 1}>
                    <div className='optionsToClick' id={i} refs={i} style={(!(i % 2)) ? {backgroundColor: '#5D6D7E'}:{backgroundColor: '#212F3C'}  } onClick={this.votedNowRender}>
                       <p>Option {i+1}:</p>  <p>{el.optionBody}</p>

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

class PresentMyPollsComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            loadedMyPolls: [],
            redirectError: false
        }
       
        this.runinrender = this.runinrender.bind(this);
        this.updatedParentAndDB = this.updatedParentAndDB.bind(this);
    }

    updatedParentAndDB( index){
        let dataToUpdate = this.state.loadedMyPolls[index];
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


export default PresentMyPollsComponent;