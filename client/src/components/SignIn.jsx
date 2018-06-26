import React from 'react';

import socket from '../socket.js';
import events from '../../../server/events.js';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    socket.on(events.signInResponse, (nameTaken) => {
      if (nameTaken) {
        alert('This name is taken. Please choose another.');
        this.setState({username: ''});
      } else {
        this.props.onSignIn(this.state.username);
      }
    });
  }

  onInputChange(e) {
    this.setState({username: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.state.username) {
      alert('You did not enter a name!');
      return;
    }
    socket.emit(events.signIn, this.state.username);
  }

  render() {
    return (
      <div className="login">
        <div className="login-title"> 
          <h1>Twittler</h1>
        </div>
        <form onSubmit={this.onSubmit}>
          <span>Sign In: <input type="text" placeholder="Enter username here" 
            value={this.state.value} onChange={this.onInputChange}/></span>
          <input className="login-button" type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default SignIn;