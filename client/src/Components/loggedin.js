import React  from 'react';


class LoggedIn extends React.Component {
     constructor(props){
         super(props);
     }
    
     componentDidMount(){
         this.props.handleuserisloggedinState();
     }
     

    render(){
      return(<div>
        Aici I am loggedIN!
        
        </div>);

    }
}

export default LoggedIn;