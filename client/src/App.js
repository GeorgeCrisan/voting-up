import React from 'react';
import Header from './header.js';
import BodyApp from './body.js'
import Footer from './footer.js'
import './app.css';

class MyApp extends React.Component {

   render(){
    return(
         
        <div className="base-style">
        <Header />
        <BodyApp />
        <Footer /> 
        
        </div>);   
    };    
}


export default MyApp;