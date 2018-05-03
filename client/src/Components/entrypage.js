import React, {Component }  from 'react';
import mgdpng from './mgb.png';
import expng from './ex.png';
import rjspng from './rjs.png';
import njpng from './nodejs.png';
import './entrypage.css';



class EntryPage extends Component {
       constructor(props){
           super(props);
       }
    render(){
        return(<div className={this.props.mystatusdisplay ? 'entry-page' : 'display-none'} >

        <div className='logos-icons'>

        <img src={mgdpng} alt='logo img node react express mongodb'/>
        <img src={expng} alt='logo img node react express mongodb'/>
        <img src={rjspng} alt='logo img node react express mongodb'/>
        <img src={njpng} alt='logo img node react express mongodb'/>

        </div>
        
        <div>
                  
                 <div>Take part on other users polls.</div>
                <div>You can create an acount for free and create your own poll.</div>
                
                <div>This application is build by George Crisan at georgerdp@gmail.com.</div>
                <div>Node, Express, ReactJS, Mongoose.</div>
            </div>
            </div>)
    }



}


export default EntryPage;