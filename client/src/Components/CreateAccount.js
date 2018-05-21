import React, {Component} from 'react';
import './logincomp.sass';
import mgdpng from './mgb.png';
import expng from './ex.png';
import rjspng from './rjs.png';
import njpng from './nodejs.png';
import './entrypage.css';
import {Col, ControlLabel, Form ,Button , Modal ,Popover , Tooltip , OverlayTrigger ,FormGroup , FormControl , FormControlFeedback , HelpBlock } from 'react-bootstrap';

class CreateAccount extends Component {
    constructor(props){
        super(props);

         this.state = {
               username: '',
               password: '',
               error:{errorMess: 'Username and password must have 6 characters or more. '},
               LandV: false
         }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleChangeUN = this.handleChangeUN.bind(this);
        this.handleChangePW = this.handleChangePW.bind(this);
        this.getValidationStateUN = this.getValidationStateUN.bind(this);
        this.CAbuttonConditions = this.CAbuttonConditions.bind(this);
        this.validcondition = this.validcondition.bind(this);

    }

    handleChangeUN(event){
       this.setState({username: event.target.value });  
        }

     handleChangePW(event){
          this.setState({password: event.target.value });  
           }  
           
    getValidationStateUN(para){ 
          
         var length = '';
         if(para === 'un')
             length = this.state.username.length;
         else if (para === 'pw')   
          length = this.state.password.length;
  
        if (length >= 6){
            return 'success';
        }
    else if (length < 6)
            return 'warning';
    else if (length > 0)
             return 'error';
    return null;
         
    }    
    
    CAbuttonConditions(){
         if(this.state.username.length < 6 || this.state.password.length < 6){
          return false;
         } 
         return true;
           
    }

    validcondition(para){
      if(para === 'password'){
        if(this.state.password.length < 6){
          return false;
         } 
         return true;
  
      } else if (para === 'username'){   
      if(this.state.username.length < 6){
       return false;
      } 
      return true;
    }  
  }

       
    onFormSubmit(event){
       event.preventDefault();

       if(this.state.username.length < 6 || this.state.password.length < 6){
        return false;
       } 

        let data = {
          username: this.state.username,
          password: this.state.password     
     }

        fetch('/authCA',{
            method:'POST',
            headers:{
             'Accept': 'application/json',
             'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)

        }).then(res=>{

                 res.json().then(data=>{
    
                 console.log(data);
                  if(data.success === true){

                        // console.log('now we can login');

                         var user = {
                           username: this.state.username,
                           password: this.state.password
                                    };

                                 console.log(user);   
                         fetch('/login',{
                             method:'POST',
                             headers:{
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                             },
                             body: JSON.stringify(user)
                         }).then(res=>{
                                 res.json().then(recdata=>{
                                  //console.log('am primit napoi de la server in create account login  ', recdata);
                                   if(recdata.confirm === 'success-login'){
                                     this.props.confirmUserIsLogged();
                                   }
                                 });
                               
                         });
                  } else if(data.success === false){
                     console.log(data.msg);
                  }
              });

        });
    }

   render(){


      const CreateAccount = (<Form onSubmit={this.onFormSubmit}  horizontal>
      <FormGroup controlId="formHorizontalUsername" validationState={this.getValidationStateUN('un')}>
          <Col componentClass={ControlLabel} sm={2}>
            Username
          </Col>
          <Col sm={10}>
            <FormControl autoComplete="off" type="text" value={this.state.username} placeholder="Username" name="username" onChange={this.handleChangeUN} />
            <p>  {this.validcondition('username') ? ' ' : this.state.error.errorMess} </p>
          </Col>
        </FormGroup>  
      
        

        <FormGroup  controlId="formHorizontalPassword"  validationState={this.getValidationStateUN('pw')} >
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl autoComplete="off" type="password" value={this.state.password} onChange={this.handleChangePW} placeholder="Password" name="password" />
            <p>{this.validcondition('password') ? ' ' : this.state.error.errorMess}</p>
            </Col>
        </FormGroup>
      
   
      
        <FormGroup>
          <Col smOffset={2} sm={10}>
          <Button onClick={this.CAbuttonConditions() ? this.props.handleClose :null } type={'submit' }>Sign Up</Button> 
          </Col>
        </FormGroup>
      </Form>);

     return(<div>
        <div className='entry-page'>

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
            </div>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Create Account </Modal.Title>
        </Modal.Header>
        <Modal.Body>
               
              {CreateAccount}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      </div>


     )
   }
}

export default CreateAccount;