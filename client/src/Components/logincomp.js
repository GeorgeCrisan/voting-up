import React, {Component} from 'react';

import { Redirect } from 'react-router';
import './logincomp.sass';
import mgdpng from './mgb.png';

import rjspng from './rjs.png';
import njpng from './nodejs.png';
import './entrypage.css';
import {Col, ControlLabel, Form ,Button , Modal ,FormGroup , FormControl } from 'react-bootstrap';

class Login extends Component {
    constructor(props){
        super(props);

          this.state= {
              username: '',
              password: '',
              error:{errorMess: 'Username and password must have 6 characters or more. ',
                     errorNoUser: 'Username is no recognized. Try again.'},    
              token: false,
              redirect: false,
          }

          this.onFormSubmit = this.onFormSubmit.bind(this);
          this.handleChangeUN = this.handleChangeUN.bind(this);
          this.handleChangePW = this.handleChangePW.bind(this);
          this.validateStateForm = this.validateStateForm.bind(this);
          this.LGbuttonConditions = this.LGbuttonConditions.bind(this);
          this.validcondition = this.validcondition.bind(this);
  
  
    }
       
    LGbuttonConditions(){
      if(this.state.username.length < 6 || this.state.password.length < 6){
       return false;
      } 

      return true;
        
 }
    handleChangeUN(event){
      this.setState({username: event.target.value });  
       }

    handleChangePW(event){
         this.setState({password: event.target.value });  
          }  
          
   validateStateForm(parameter){
        let length = '';

        if(parameter === 'un')
           length = this.state.username.length;
      else if (parameter === 'pw')   
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

      if(this.state.password.length < 6 || this.state.username.length < 6)
          return false;

      var userT = {
            username: this.state.username,
            password: this.state.password
      }    
 
     fetch('/login',{
       method: 'POST',
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
     },
     body: JSON.stringify(userT)
     }).then(res=>{

         res.json().then(data=>{

           if(data.success === true){

            localStorage.setItem('jwtTokenFS',data.token);
             console.log(data.userId);
            this.props.confirmUserIsLogged(data.token, this.state.username , data.userId);
            this.setState({username:'',password: ''});
          } else if (data.success === false){
                if(data.from === 'nouser'){

             this.setState({redirect: true});

                } else if (data.from === 'wrongpass')

               this.setState({redirect: true});  
          }
 
         });

     });

  }

  

   render(){
    const { redirect } = this.state;


    if (redirect) {


      return <Redirect to='/errorLogin'/>;

    } else if (this.state.token){

      return <Redirect to='/polls'/>;

    }
    
    const LogInForm = (<Form onSubmit={this.onFormSubmit}  horizontal>
      <FormGroup controlId="formHorizontalUsername" validationState={this.validateStateForm('un')}>
          <Col componentClass={ControlLabel} sm={2}>
            Username
          </Col>
          <Col sm={10}>
            <FormControl autoComplete="off" type="text" value={this.state.username} placeholder="Username" name="username" onChange={this.handleChangeUN} />
            <FormControl.Feedback />
            <p className='errMessP' >  {this.validcondition('username') ? ' ' : this.state.error.errorMess} </p>
          </Col>
        </FormGroup>  
      
        

        <FormGroup  controlId="formHorizontalPassword"  validationState={this.validateStateForm('pw')} >
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl autoComplete="off" type="password" value={this.state.password} onChange={this.handleChangePW} placeholder="Password" name="password" />
            <FormControl.Feedback />
            <p className='errMessP'>{this.validcondition('password') ? ' ' : this.state.error.errorMess}</p>
            </Col>
        </FormGroup>
      
   
      
        <FormGroup>
          <div className='logInInfo'>
          <Button bsStyle='success'  onClick={this.LGbuttonConditions() ? this.props.handleClose :null } type={'submit' }>Log In</Button> 
          <div > <p> Be aware that username it is case sensitive! </p> </div>
          </div>
        </FormGroup>
      </Form>);



     return(<div>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Login </Modal.Title>
        </Modal.Header>
        <Modal.Body>
               
              {LogInForm }
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='danger' onClick={this.props.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
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

    </div>
     )
   }
}

export default Login;