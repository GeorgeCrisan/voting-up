import React from 'react';
import Header from './header.js';
import BodyApp from './body.js';
import Footer from './footer.js';
import {Route} from 'react-router-dom';
import EntryPage from './Components/entrypage.js';
import Login from './Components/logincomp.js';
import CreateAccount from './Components/CreateAccount.js';
import './app.css';



class MyApp extends React.Component {
        constructor(props){
              super(props);
              this.state = {
                     loadedPolls : [],
                     loadedUsers: [],
                     showModalAuth: false


              }
          this.BodyAppWP = this.BodyAppWP.bind(this);
          this.Login = this.Login.bind(this);
          this.handleShow = this.handleShow.bind(this);
          this.handleClose = this.handleClose.bind(this);
          this.CreateAccountF = this.CreateAccountF.bind(this);
        }

        handleClose(){
            
            
            this.setState({showModalAuth: false});
            
        }
 
        handleShow(){

            
            this.setState({showModalAuth: true});

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

                }).catch(error=>{
                    alert(error + 'Try again!');
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

      Login(){
          return(<Login show={this.state.showModalAuth} handleClose={this.handleClose} handleShow={this.handleShow} />);
      }

      CreateAccountF(){
        return(<CreateAccount show={this.state.showModalAuth} handleClose={this.handleClose} handleShow={this.handleShow} />);
    }

   render(){
       
    return(
         
        <div className="base-style">
        <Header SwitchAuthCA={this.SwitchAuthCA} SwitchAuthSI={this.SwitchAuthSI} handleShow={this.handleShow}/>
        <Route path='/polls' render={this.BodyAppWP}/>
        <Route exact path='/' component={EntryPage} />
        <Route path='/authSignIn' render={this.Login}/>
        <Route path='/authCA' render={this.CreateAccountF}/>
        <Footer />
        
        </div>);   
    };    
}


export default MyApp;