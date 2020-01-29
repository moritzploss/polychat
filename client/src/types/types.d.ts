export interface Action {
  type: string;
}

export interface Client {
  websocket?: WebSocket;
}

declare module 'redux-react-session';
