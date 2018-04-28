import React from 'react';
import Header from './header.js';
import BodyApp from './body.js'
import Footer from './footer.js'
import './app.css';



class MyApp extends React.Component {
        constructor(props){
              super(props);
              this.state = {
                     loadedPolls : [],
                     loadedUsers: []
              }

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

   render(){
       
    return(
         
        <div className="base-style">
        <Header />
        <BodyApp pollPosts={this.state.loadedPolls} users={this.state.loadedUsers} />
        <Footer /> 
        
        </div>);   
    };    
}


export default MyApp;