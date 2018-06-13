import React from 'react';
import Header from './header.js';
import AllPollsComponent from './allpolls.js';
import Footer from './footer.js';
import {Route, Switch} from 'react-router-dom';
import EntryPage from './Components/entrypage.js';
import Login from './Components/logincomp.js';
import CreateAccount from './Components/CreateAccount.js';
import ErrorContainerLogin from './Components/ErrorContainerLogin.js';
import ErrorContainerCA from './Components/ErrorContainerCA.js';
import ErrorUnauthorized from './Components/errorUnauthorized.js';
import CreatePollComponent from './Components/createpoll.js';
import PresentMyPollsComponent from './Components/mypolls.js';
import './App.css';



class MyApp extends React.Component {
        constructor(props){
              super(props);
              this.state = {
                     loadedPolls : [],
                     showModalAuth: false,
                     userIsLogged: false,
                     token:  null


              }
          this.allpolls = this.allpolls.bind(this);
          this.Login = this.Login.bind(this);
          this.handleShow = this.handleShow.bind(this);
          this.handleClose = this.handleClose.bind(this);
          this.CreateAccountF = this.CreateAccountF.bind(this);
          this.confirmUserIsLogged = this.confirmUserIsLogged.bind(this);
          this.confirmLogOut = this.confirmLogOut.bind(this);
          this.ErrorHandlingLogin = this.ErrorHandlingLogin.bind(this);
          this.ErrorHandlingCA = this.ErrorHandlingCA.bind(this);
          this.createPollHandler = this.createPollHandler.bind(this);
          this.ErrorNotAuth = this.ErrorNotAuth.bind(this);
          this.PresentMyPolls = this.PresentMyPolls.bind(this);
        }

        handleClose(){


            this.setState({showModalAuth: false});

        }
        
        
        handleShow(){


            this.setState({showModalAuth: true});

        }


       confirmUserIsLogged(paramCUIL){

           this.setState({userIsLogged: true, token: paramCUIL});

       }

       confirmLogOut(){
           this.setState({userIsLogged: false, token: null});
           localStorage.removeItem('jwtTokenFS');
         //  window.location.reload();

       }



      componentDidMount(){
                       if(localStorage.getItem('jwtTokenFS')){
                                var gotToken = localStorage.getItem('jwtTokenFS');
                           this.setState({userIsLogged: true,
                            token: gotToken});
                       }
                              
      }

      allpolls(){
          return(<AllPollsComponent  />);
      }

      Login(){
          return(<Login confirmUserIsLogged={this.confirmUserIsLogged} show={this.state.showModalAuth} handleClose={this.handleClose} handleShow={this.handleShow} />);
      }

      CreateAccountF(){

         return(<CreateAccount confirmUserIsLogged={this.confirmUserIsLogged} show={this.state.showModalAuth} handleClose={this.handleClose} handleShow={this.handleShow} />);

        }

     ErrorHandlingCA(){
         return (<ErrorContainerCA  />)
     } 

     ErrorNotAuth(){
         return (<ErrorUnauthorized logout={this.confirmLogOut} />);
     }
        
      ErrorHandlingLogin(){
          return (<ErrorContainerLogin />);
      }
     
      createPollHandler(){
          return (<CreatePollComponent token={this.state.token} show={this.state.showModalAuth}  handleClose={this.handleClose} handleShow={this.handleShow} />);
      }

      PresentMyPolls(){
            return (<PresentMyPollsComponent token={this.state.token} />);
      }


   render(){

    return(

        <div className="base-style">

        <Header confirmLogOut={this.confirmLogOut} SwitchAuthCA={this.SwitchAuthCA} SwitchAuthSI={this.SwitchAuthSI} handleShow={this.handleShow}  userIsLogged={this.state.userIsLogged}/>
        <Switch>
        <Route path='/polls' render={this.allpolls}/>
        <Route exact path='/' component={EntryPage} />
        <Route path='/authSignIn' render={this.Login}/>
        <Route path='/register' render={this.CreateAccountF } />
        <Route path='/errorLogin' render={this.ErrorHandlingLogin }/>
        <Route path='/errorNotAuthorized' render={this.ErrorNotAuth }/>
        <Route path='/error-create-account' render={this.ErrorHandlingCA} />
        <Route path='/createnewpoll' render={this.createPollHandler} />
        <Route path='/mypolls' render={this.PresentMyPolls}/>
        </Switch>
        <Footer />

        </div>);
    };
}


export default MyApp;
