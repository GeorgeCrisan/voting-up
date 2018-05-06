import React, {Component} from 'react';
import './logincomp.sass';
import mgdpng from './mgb.png';
import expng from './ex.png';
import rjspng from './rjs.png';
import njpng from './nodejs.png';
import './entrypage.css';
import {Col, ControlLabel, Form ,Button , Modal ,Popover , Tooltip , OverlayTrigger ,FormGroup , FormControl , FormControlFeedback , HelpBlock } from 'react-bootstrap';

class Login extends Component {
    constructor(props){
        super(props);
  
    }
       

   render(){

    const LogInForm = (<Form horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="Email" />
          </Col>
        </FormGroup>
      
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="Password" />
          </Col>
        </FormGroup>
      
   
      
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button bsStyle='info' type="submit">SIGN IN</Button>
          </Col>
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
          <Button onClick={this.props.handleClose}>Close</Button>
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