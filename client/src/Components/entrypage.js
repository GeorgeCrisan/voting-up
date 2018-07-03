import React, {Component }  from 'react';
import mgdpng from './mgb.png';
import rjspng from './rjs.png';
import njpng from './nodejs.png';
import './entrypage.css';



class EntryPage extends Component {

    render(){
        return(<div className='entry-page'>

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
            </div>)
    }



}


export default EntryPage;