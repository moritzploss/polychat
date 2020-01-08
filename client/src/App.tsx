import React from 'react';
import uuid from 'uuid/v4';
import { BrowserRouter as Router } from "react-router-dom";

import { Routes } from './Components/Routes';

import './App.css';

const openWebSocket = (socketId: string): WebSocket => {
  const protocolPrefix = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const { host } = window.location;
  return new WebSocket(`${protocolPrefix}//${host}/api/websockets/clients/${socketId}`);
}

const App: React.FC = () => {

  const socket = openWebSocket(uuid());

  return (
    <Router>
      <div className="App">
        {socket.readyState}
      </div>

      <Routes />
    </Router>
  );
}

export default App;
