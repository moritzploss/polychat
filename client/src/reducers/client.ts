import { openNewWebSocket } from '../websockets/websockets';

interface Client {
  websocket?: WebSocket;
}

const addWebsocket = (userId: string) => ({
  type: 'ADD WEBSOCKET',
  websocket: openNewWebSocket(userId),
});

const clientReducer = (client = {}, action: any): Client => {
  switch (action.type) {
    case 'ADD WEBSOCKET':
      return {
        ...client,
        websocket: action.websocket,
      };
    default:
      return client;
  }
};

export { clientReducer, addWebsocket };
