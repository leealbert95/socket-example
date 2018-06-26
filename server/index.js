const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const SocketServer = require('./SocketServer.js')

const port = process.env.port || 3005;

app.use(express.static(path.join(__dirname, '../client/dist')))

const sockets = new SocketServer(io);
sockets.start();

server.listen(port, () => {
  console.log('Listening on port: ' + port);
})
