export interface Action {
  type: string;
}

export interface Client {
  websocket?: WebSocket;
}

export interface ReduxStoreContents {
  client: Record<string, any>;
  user: Record<string, string>;
  session: Record<string, any>;
}

export type UserData = Record<string, any>;

declare module 'redux-react-session';
