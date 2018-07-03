import React, {Component} from 'react';
import './mypolls.css';
import {Redirect} from 'react-router';
import { Button , Modal , FormGroup , FormControl , Col } from 'react-bootstrap';
 


class ModalPoll extends Component {
    constructor(props, context) {
      super(props, context);
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.deletePoll = this.deletePoll.bind(this);
      this.editPoll = this.editPoll.bind(this);
      this.addOption = this.addOption.bind(this);
      this.removeOption = this.removeOption.bind(this);
      this.submitChange = this.submitChange.bind(this);
      this.validateStateForm = this.validateStateForm.bind(this);
      this.processChange = this.processChange.bind(this);

    
  

      this.state = {
        
        show: false,
        redirectError: false,
        redirectToMyPolls: false,
        redirectToAllPolls: false,
        eventId: undefined,
        editMode: false,
        tempOptions: this.props.elementoptions,

  



      };
    }
  
    handleClose() {
      this.setState({ show: false, editMode: false, tempOptions: this.props.elementoptions  });
 
    }


    processChange(event){
      let i = Number(event.target.name.charAt(0));
      let mod = this.state.tempOptions;
      mod[i].optionBody = event.target.value;
      this.setState({tempOptions: mod});

      



    }

 
  
    handleShow() {
      this.setState({ show: true });
    }

    

    editPoll(){
        
        const createClone = JSON.parse(JSON.stringify(this.props.elementoptions));
       this.setState({ show: true, editMode: true, tempOptions: createClone});
 
    }

    submitChange(event){
       let queryId = String(event.target.id);
      let temp = this.state.tempOptions;

      console.log(temp);
         
      console.log(queryId);
          fetch('/optionsUpdate/' + queryId,{
            method: 'POST',
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': this.props.token 
            },
            body: JSON.stringify(temp)
             
          }).then((res)=>{
            console.log(res);
 
              if (res.status === 401 ){

                this.setState({redirectError: true});
                console.log('Not authorised'); 
              } else if (res.status === 404) {
                this.setState({redirectError: true});
                console.log('not found');

              } else if (res.status === 200) {
                res.json().then((data)=>{
                  if(data.success === true){
                    this.handleClose();
                    this.props.fetchData();
                    this.setState({redirectToAllPolls: true});
                  }
  
                });
              }
                

              

          });
    }

    addOption(event){


        let temp = this.state.tempOptions;
        temp.push({_id: undefined, optionBody: '', votes: 0});
        this.setState({tempOptions:temp});
        

    }

    removeOption(event){

        let queryId = String(event.target.id);
        console.log(queryId);
        let temp = this.state.tempOptions;
        temp.pop();
         this.setState({tempOptions: temp});

      
    }

 validateStateForm(i){
     let length = '';
    
   
         length = this.state.tempOptions[i].optionBody.length;

          if (length >= 1 ){
              return 'success';
          }
       else if (length < 1)
              return 'warning';
       else if (length < 0)
               return 'error';
       return null;
 }

    
   
    deletePoll(event){
          let elementNameQuery ={pollToDeletebyId:  event.target.id};

      fetch(`/deletepoll`,{
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.props.token 
        },
        body: JSON.stringify(elementNameQuery)
      }).then(res=>{
          if( res.status === 401){
             this.setState({redirectError: true});
            console.log('Not authorised');
          } else if (res.status === 404){
            alert('resource not found');
          }
               
                
          res.json().then((data)=>{

            if(data.success === true){
              this.handleClose();
              this.props.fetchData();
            }

          });  
      }); 
    }
  

 

    render() {
      if(this.state.redirectError === true )
          return (<Redirect to='/errorNotAuthorized'/> );

          if(this.state.redirectToAllPolls === true )
          return (<Redirect to='/polls'/> );    
 

      return (
        <div>
          
          <Button bsStyle="primary" onClick={this.handleShow}>
            Results
          </Button>
          <Button bsStyle="success"  onClick={this.editPoll}> Edit Poll </Button>

          
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.elementname}</Modal.Title>
              
            </Modal.Header>
            <Modal.Body className='poll-detail'>
  
             
              {
                
                
                this.state.tempOptions.map((el,i)=>{

                  
                   return(<a key={i + 1}>
                    <div className='optionsToClick' id={i} refs={i} style={(!(i % 2)) ? {backgroundColor: '#212F3C'}:{backgroundColor: '#212F3C'}  } >

                       {this.state.editMode ? <FormGroup controlId={'option'+ i} key={i} validationState={ this.validateStateForm(i)}>
                       <Col sm={12}>
                      
                       <FormControl type="text" autoComplete="off"   name={i+'option'} value={el.optionBody } placeholder={'Option '+i} onChange={this.processChange}/>
                       
                       <FormControl.Feedback/>
                       </Col>
                     </FormGroup> : (<div><p>Option {i+1}:</p>  <p>{el.optionBody } </p> <p>{'Votes Total: '+ el.votes}</p></div>)}

                   </div>
                   </a>)

              }) }
              <div className="chartvotes" id="chart" ref="chart"></div>

            </Modal.Body>
            <Modal.Footer >
            { this.state.editMode ? <Button bsStyle="success" bsSize="sm" id={this.props.id} onClick={this.submitChange}> Submit Change </Button> : null}
             <Button bsStyle="danger" bsSize="sm" id={this.props.id} onClick={this.deletePoll}> Delete Poll </Button>
             { this.state.editMode ? <Button bsStyle="info" bsSize="sm" id={this.props.id} onClick={this.addOption}> Add Option </Button> : null}
             { this.state.editMode ? <Button bsStyle="warning" bsSize="sm" id={this.props.id} onClick={this.removeOption}> Remove Option </Button> : null}
              <Button bsSize="sm" onClick={this.handleClose}>Close</Button>
              
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
            redirectError: false
        }
       
        this.runinrender = this.runinrender.bind(this);
        this.updatedParentAndDB = this.updatedParentAndDB.bind(this);
        //this.pleaseUpdate = this.pleaseUpdate.bind(this);

    }

   

    updatedParentAndDB( index){
        let dataToUpdate = this.props.loadedMyPolls[index];
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
             // console.log(data);
           });  
       });  
}
    

    componentDidMount(){
        // console.log(this.props.loadedMyPolls);
         
       }
      

       runinrender(){
        let data = this.props.loadedMyPolls;
        
       return  data.map((element,i) => {
              if(element.createdBy === this.props.userIs){
          return (<div key={i} className='elementPollMy'>
                 <ul>
                    <li>Poll Title: <p> {element.question}</p></li>
                    <li>Created by: <p>{element.createdBy}</p> </li>
                    
                    <li><ModalPoll  fetchData={this.props.fetchData}  token={this.props.token} orderMe={i} updatedParentAndDB={this.updatedParentAndDB} elementname={element.question} id={element._id} userid={element.createdBy} elementoptions={element.options} elementvotes={element.options.votes}/></li>
                    </ul>
                    <div className='shareLink'> <a href={`https://voting-up.herokuapp.com/sharedpoll/${element._id}`}>Share link: {"https://voting-up.herokuapp.com/sharedpoll/" + element._id}</a></div>
                 
          </div>);
              }
         });
          
   }

render() {
  if(this.state.redirectError === true )
          return (<Redirect to='/errorNotAuthorized'/> );
  
    return (
      <div className="bodyapp">
          {this.runinrender()}
          
      </div>
    );

   

  
}

}


export default PresentMyPollsComponent;