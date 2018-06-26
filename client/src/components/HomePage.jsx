import React from 'react';
import Alert from 'react-s-alert';

import socket from '../socket.js';
import events from '../../../server/events.js';

import TweetForm from './TweetForm.jsx';
import TweetFeed from './TweetFeed.jsx';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
    }
    this.submitTweet = this.submitTweet.bind(this);
    this.messageUser = this.messageUser.bind(this);
  }

  componentDidMount() {
    socket.on(events.emitToFeed, (feed) => {
      this.setState({
        feed: feed
      })
    });

    socket.on(events.emitToUser, ({from, text}) => {
      Alert.info(`From ${from}: ${text}`, {
        position: 'top-right',
      });
    });

    window.onbeforeunload = () => {
      socket.emit(events.userDisconnect);
    }

    socket.emit(events.enterLobby);
  }

  submitTweet(message) {
    console.log('Submitted tweet')
    socket.emit(events.newTweet, {
      username: this.props.username,
      message: message
    });
  }

  messageUser(username) {
    if (username === this.props.username) {
      return;
    }
    let text = prompt('Enter message');
    socket.emit(events.messageUser, {
      to: username,
      text: text
    })
  }

  render () {
    return (
      <div>
        <div className="header"><h1>Welcome, {this.props.username}</h1></div>
        <div className="content">
          <TweetForm onSubmit={this.submitTweet}/>
          <TweetFeed tweets={this.state.feed} messageUser={this.messageUser}/>
        </div>
        <Alert stack={{limit: 3}}/>
      </div>
    )
  }
}

export default HomePage;