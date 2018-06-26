const _ = require('lodash');

const events = require('./events.js');

module.exports = function(io) {
  const findSocket = (username) => {
    return this.users[username];
  };

  this.users = {};
  this.tweets = [];

  this.start = () => {
    console.log('Starting chatroom');
    io.on('connect', (socket) => {
      console.log('New connection');
      socket.on(events.signIn, (username) => {
        socket.id = username;
        let nameTaken = this.users.hasOwnProperty(username);
        if (!nameTaken) {
          this.users[username] = socket;
          console.log('User ' + username + ' has joined');
        }
        socket.emit(events.signInResponse, nameTaken);
      });

      socket.on(events.userDisconnect, () => {
        console.log('User ' + socket.id + ' has disconnected');
        delete this.users[socket.id];
      });

      socket.on(events.enterLobby, () => {
        socket.emit(events.emitToFeed, this.tweets);
      });

      socket.on(events.newTweet, (tweet) => {
        console.log(tweet);
        this.tweets.push(tweet);
        io.sockets.emit(events.emitToFeed, this.tweets);
      });

      socket.on(events.messageUser, (message) => {
        let otherSocket = this.users[message.to];
        if (otherSocket) {
          otherSocket.emit(events.emitToUser, {
            from: socket.id,
            text: message.text
          })
        }
      })
    })
  };
}