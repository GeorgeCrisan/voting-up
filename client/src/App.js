import React from 'react';
import Header from './header.js';
import BodyApp from './body.js';
import Footer from './footer.js';
import {Route, Switch} from 'react-router-dom';
import EntryPage from './Components/entrypage.js';
import Login from './Components/logincomp.js';
import CreateAccount from './Components/CreateAccount.js';
import './app.css';



class MyApp extends React.Component {
        constructor(props){
              super(props);
              this.state = {
                     loadedPolls : [],
                     showModalAuth: false,
                     userIsLogged: false


              }
          this.BodyAppWP = this.BodyAppWP.bind(this);
          this.Login = this.Login.bind(this);
          this.handleShow = this.handleShow.bind(this);
          this.handleClose = this.handleClose.bind(this);
          this.CreateAccountF = this.CreateAccountF.bind(this);
          this.confirmUserIsLogged = this.confirmUserIsLogged.bind(this);
          this.confirmLogOut = this.confirmLogOut.bind(this);
        }

        handleClose(){
            
            
            this.setState({showModalAuth: false});
            
        }
 
        handleShow(){

            
            this.setState({showModalAuth: true});

        }
 
  
       confirmUserIsLogged(){
           console.log('this is runing to confirm loggedin');
           this.setState({userIsLogged: true});
       }

       confirmLogOut(){
           this.setState({userIsLogged: false});
       }



      componentDidMount(){
                fetch('/allpolls',{
                    method: 'GET',
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
                    console.log(error + ' Try again!');
                });
 
      }  

      BodyAppWP(){
          return(<BodyApp pollPosts={this.state.loadedPolls} users={this.state.loadedUsers} />);
      }

      Login(){
          return(<Login confirmUserIsLogged={this.confirmUserIsLogged} show={this.state.showModalAuth} handleClose={this.handleClose} handleShow={this.handleShow} />);
      }

      CreateAccountF(){
    
         return(<CreateAccount confirmUserIsLogged={this.confirmUserIsLogged} show={this.state.showModalAuth} handleClose={this.handleClose} handleShow={this.handleShow} />);

        }






   render(){
       
    return(
         
        <div className="base-style">
        
        <Header confirmLogOut={this.confirmLogOut} SwitchAuthCA={this.SwitchAuthCA} SwitchAuthSI={this.SwitchAuthSI} handleShow={this.handleShow} userIsLogged={this.state.userIsLogged}/>
        <Switch>
        <Route path='/polls' render={this.BodyAppWP}/>
        <Route exact path='/' component={EntryPage} />
        <Route path='/authSignIn' render={this.Login}/>
        <Route path='/authCA' render={this.CreateAccountF } />
        </Switch>
        <Footer />
        
        </div>);   
    };    
}


export default MyApp;