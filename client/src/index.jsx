import React from 'react';
import ReactDOM from 'react-dom';

import events from '../../server/events.js';
import socket from './socket.js';

import App from './components/App.jsx';

ReactDOM.render(
  <App/>,
  document.getElementById("app")
)