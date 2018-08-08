import React, {Component} from 'react';
import './footer.css';



class Footer extends Component {
     constructor(props,context){
          super(props,context);
     
          this.getYear = this.getYear.bind(this);
     } 


    getYear(){
                  let today = new Date();
                  let yy = today.getFullYear();

                      
            return String(yy);          
    } 
    
    render(){
       return(<div className='Footer-bit'> <p>This application has been made for freecodecamp by George Crisan georgecrisan.com  {this.getYear()}</p> </div> );

    }
}


export default Footer;