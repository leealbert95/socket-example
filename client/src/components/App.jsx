import React from 'react';

import socket from '../socket.js';
import events from '../../../server/events.js';

import SignIn from './SignIn.jsx';
import HomePage from './HomePage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      username: ''
    };
    this.onSignIn = this.onSignIn.bind(this);
  }

  componentDidMount() {
    socket.on('disconnect', () => {
      console.log('disconnected from server');
      this.setState({signedIn: false, username: ''});
      socket.emit(events.userDisconnect);
    })
  }

  onSignIn(username) {
    this.setState({signedIn: true, username: username});
  }

  render() {
    return (
      <div>
        {this.state.signedIn 
          ? <HomePage username={this.state.username}/> 
          : <SignIn onSignIn={this.onSignIn}/>}
      </div>
    );
  }

}

export default App;