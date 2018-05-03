import React from 'react';
import Header from './header.js';
import BodyApp from './body.js';
import Footer from './footer.js';
import {Route} from 'react-router-dom';
import EntryPage from './Components/entrypage.js';
import './app.css';



class MyApp extends React.Component {
        constructor(props){
              super(props);
              this.state = {
                     loadedPolls : [],
                     loadedUsers: [],
                     entrypagestyle: true
              }
          this.BodyAppWP = this.BodyAppWP.bind(this);
          this.buttonEpFunc = this.buttonEpFunc.bind(this);
        }

        buttonEpFunc(){
            if(this.state.entrypagestyle)
                this.setState({entrypagestyle: false})
  
     }

      componentDidMount(){
                fetch('/allpolls',{
                    method: 'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                     }
                }).then((response)=>{

                     response.json().then((data)=>{

                            console.log('data loaded in the componentDidMount the polls');

                            var tempArray = [];

                            data.forEach((el)=>{
                                tempArray.push(el);
                            });

                          this.setState({loadedPolls: tempArray});     

                     });

                });

              fetch('/allusers',{
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    }
                 }).then((response)=>{

                     response.json().then(data=>{
                        console.log('data loaded in the componentDidMount The users');

                         var tempArray = [];
                         data.forEach(element => {
                             tempArray.push(element);
                         });

                         this.setState({loadedUsers: tempArray});
                         

                     });
              });  
      }  

      BodyAppWP(){
          return(<BodyApp pollPosts={this.state.loadedPolls} users={this.state.loadedUsers} />);
      }

   render(){
       
    return(
         
        <div className="base-style">
        <Header buttonEpFunc={this.buttonEpFunc} />
        <Route path='/polls' render={this.BodyAppWP}/>
        <EntryPage mystatusdisplay={this.state.entrypagestyle}/>
        <Footer />
        
        </div>);   
    };    
}


export default MyApp;