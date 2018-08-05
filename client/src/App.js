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
import SharedPoll from './Components/sharedpolls.js';
import './App.css';

 

class MyApp extends React.Component {
        constructor(props){
              super(props);
              this.state = {
                     loadedPolls : [],
                     showModalAuth: false,
                     userIsLogged: false,
                     token:  null,
                     userIs: null,
                     userId: null

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
          this.fetchData = this.fetchData.bind(this);
          this.sharedPoll = this.sharedPoll.bind(this);
          this.UpdateParent = this.UpdateParent.bind(this);
        }

        handleClose(){


            this.setState({showModalAuth: false});

        }
        
        
        handleShow(){


            this.setState({showModalAuth: true});

        }

        UpdateParent(info){
            let infoAr = Object.entries(info);
            let arrayOfOBj = [];
            for(let j = 0; j < infoAr.length; j++){
                arrayOfOBj.push(infoAr[j][1]);
            }
              

              this.setState({loadedPolls: arrayOfOBj});
      
            }
        
        fetchData(){
            fetch('/allpolls',{
              method: 'GET',
              headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
               }
          }).then((response)=>{
      
               response.json().then((data)=>{
      
                    this.setState({loadedPolls: data});
      
               });
      
          }).catch(error=>{
              console.log(error + ' Try again!');
          });
    
           }

       confirmUserIsLogged(paramCUIL,userWho,userIdul){

           this.setState({userIsLogged: true, token: paramCUIL, userIs: userWho , userId: userIdul});
           localStorage.setItem('userIs',userWho);

       }

       confirmLogOut(){
           this.setState({userIsLogged: false, token: null, userIs: null});
           localStorage.removeItem('jwtTokenFS');
           localStorage.removeItem('userIs');
         //  window.location.reload();

       }



      componentDidMount(){
                       if(localStorage.getItem('jwtTokenFS')){
                                var gotToken = localStorage.getItem('jwtTokenFS');
                                var userIsNow = localStorage.getItem('userIs');
                           this.setState({userIsLogged: true,
                            token: gotToken,
                        userIs: userIsNow});
                       }

                       fetch('/allpolls',{
                        method: 'GET',
                        headers:{
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                         }
                    }).then((response)=>{
                
                         response.json().then((data)=>{
                
                              this.setState({loadedPolls: data});
                
                         });
                
                    }).catch(error=>{
                        console.log(error + ' Try again!');
                    });
              
                              
      }

      allpolls(){
          return(<AllPollsComponent useris={this.state.userIs} fetchData={this.fetchData} loadedPolls={this.state.loadedPolls} />);
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
     
      sharedPoll(props){
             
          return (<SharedPoll {...props} UpdateParent={this.UpdateParent} />); 
      }

      createPollHandler(){
          return (<CreatePollComponent userId={this.state.userId} userIs={this.state.userIs} token={this.state.token} fetchData={this.fetchData} show={this.state.showModalAuth}  handleClose={this.handleClose} handleShow={this.handleShow} />);
      }

      PresentMyPolls(){
            return (<PresentMyPollsComponent useris={this.state.userIs} userId={this.state.userId} fetchData={this.fetchData} loadedMyPolls={this.state.loadedPolls} userIs={this.state.userIs} token={this.state.token} />);
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
        <Route path='/sharedpoll/:id' render={this.sharedPoll}/>
        </Switch>
        <Footer />

        </div>);
    };
}


export default MyApp;
