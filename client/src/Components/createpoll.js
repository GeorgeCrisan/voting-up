import React , {Component} from 'react';
import './createpoll.css';
import {Redirect} from 'react-router';
import {Modal , Button , Form , FormGroup , FormControl , Col , ControlLabel , Glyphicon} from 'react-bootstrap';

class CreatePollComponent extends Component {

    constructor(props, context){
         super(props , context);
         this.state= {
            question: '',
            options: [{optionBody: '', votes: 0}],
            error:{errorMess: 'Characters requiered.',
                   notEnogghOptions: 'Please insert at least one option.'},    
            token: '',
            redirect: false,
            redirectError: false
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleChangeFormValueQuestion = this.handleChangeFormValueQuestion.bind(this);
        this.validateStateForm = this.validateStateForm.bind(this);
        this.SubmitConditions = this.SubmitConditions.bind(this);
        this.validcondition = this.validcondition.bind(this);
        this.handleChangeFormValueOption = this.handleChangeFormValueOption.bind(this);
        this.addOption = this.addOption.bind(this);
        this.removeOption = this.removeOption.bind(this);

    }
     componentWillReceiveProps(nextProps){

            this.setState({token: nextProps.token});

        }
  

    removeOption(){
      let tempOptions = {...this.state};
      tempOptions.options.pop();
      this.setState(...tempOptions);
      this.forceUpdate();

    }

    addOption(){
             if(this.state.options.length > 20){
              alert('No more than 20 options are allowed to prevent spam!');
               return false;
               
             }
      let tempOptions = {...this.state};
      tempOptions.options.push({optionBody:'', votes: 0});
      this.setState(...tempOptions);
      this.forceUpdate();

    }

    SubmitConditions(){
        if(this.state.question.length < 1 || this.state.options.length < 1){
          
         return false;
        } 

        return true;
          
   }
      handleChangeFormValueQuestion(event){


        this.setState({question: event.target.value });  

        }

      handleChangeFormValueOption(event){
           let tempOptions,index;
           index = parseInt(event.target.name.charAt(0));
          tempOptions = {...this.state};
          tempOptions.options[index].optionBody = event.target.value;
         this.setState({...tempOptions});
      }  
  
    
            
     validateStateForm(parameter,index){
          let length = '';
  
          if(parameter === 'question')
             length = this.state.question.length;
        else if (parameter === 'option')   
             length = this.state.options[index].optionBody.length;
  
              if (length >= 1 ){
                  return 'success';
              }
           else if (length < 1)
                  return 'warning';
           else if (length < 0)
                   return 'error';
           return null;
     }
     
     validcondition(para){
      if(para === 'question'){
        if(this.state.question.length < 1){
          return false;
         } 
         return true;
  
      } else if (para === 'option'){   
      if(this.state.options.length < 6){
       return false;
      } 
      return true;
    }  
  }

    
  
    onFormSubmit(event){
        event.preventDefault();
        if(this.state.question.length < 2 || this.state.options.length < 1){

          return false;
        }
          
        let dataToSubmit = {
          question: this.state.question,
          options: this.state.options
     };
    fetch('/createpoll',{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.state.token 
      },
        body: JSON.stringify(dataToSubmit)
    }).then(res=>{
         if(res.status === 401){
            this.setState({redirectError: true})

         } else {

          res.json().then(dataRec=>{
              
         
            if(dataRec.success === true){
               this.setState({redirect: true});
            }
           });
         }
    });   
  
    }
    
    render(){

             if(this.state.redirect){
               return (<Redirect to='/polls'/>);

             } else if (this.state.redirectError){

              return (<Redirect to='/errorNotAuthorized'/>);
             }

            let optionsToRender = [];
           
          for(var i = 0; i < this.state.options.length; i++){
                optionsToRender.push(
                  <FormGroup controlId={'option'+ i} key={i} validationState={this.validateStateForm('option',i)}>
                  <Col smOffset={2} sm={8}>
                 
                  <FormControl type="text" autoComplete="off"   name={i+'option'} value={this.state.options[i].optionBody} placeholder={'Option '+i} onChange={this.handleChangeFormValueOption}/>
                  
                  <FormControl.Feedback/>
                  </Col>
                </FormGroup>


                );

          }

            const FormBody = (
              
              <Form onSubmit={this.onFormSubmit}  horizontal>
                <FormGroup controlId="formHorizontalCreatePoll" validationState={this.validateStateForm('question')}>
                <Col componentClass={ControlLabel} sm={12}>
                            <h2 style={{'textAlign' :'center' ,'fontFamily': 'Titillium Web', 'fontSize': '24px'}}>Insert a query title for the poll!</h2>
                       </Col>

                    <Col sm={12}>
                      <FormControl autoComplete="off" type="text" value={this.state.question} placeholder={this.validcondition('question') ? ' ' : this.state.error.errorMess} name="question" onChange={this.handleChangeFormValueQuestion} ></FormControl>
                      <FormControl.Feedback />
                      </Col>
                  </FormGroup>  


                 {optionsToRender}

               
                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                    <Button bsStyle='warning' onClick={this.addOption } >Add option!</Button>
                    <Button bsStyle='danger' style={{"marginLeft": "30px"}} onClick={this.removeOption } >Delete option!</Button> 
                    <Button bsStyle='success' style={{"marginLeft": "30px"}}  onClick={this.SubmitConditions() ? this.props.handleClose :null } type={'submit'}>Create Poll!</Button>       
                    </Col>
                  </FormGroup>
                </Form>)
          
        return( <Modal show={this.props.show} onHide={this.props.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> Create new Poll </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               { FormBody }
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>);
    }
}

export default CreatePollComponent;