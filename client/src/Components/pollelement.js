import React, { Component } from 'react';
import './pollelements.css';
import {Popover , Button , Modal , OverlayTrigger , Tooltip} from 'react-bootstrap';

class ModalPoll extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false
      };
    }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }
  
    render() {
      const popover = (
        <Popover id="modal-popover" title="popover">
          very popover. such engagement
        </Popover>
      );
      const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;
  
      return (
        <div>
  
          <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
            Open 
          </Button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.elementname}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Created by: {this.props.userid}</h4>

  
     
              <hr />
  
              <h4>Options:</h4>
              {this.props.elementoptions.map((el,i)=>{
                   return(<div key={i+12}>
                       <p><a>Option {i+1}:  {el.value}</a></p>
                       <p>Number of votes: {el.votes}</p>
                   </div>)

              }) }

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }

  export default ModalPoll;