import { openNewWebSocket } from '../websockets/websockets';

const addWebsocket = (userId: string) => ({
  type: 'ADD WEBSOCKET',
  websocket: openNewWebSocket(userId),
});

const client = (client = {}, action: any) => {
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

export { client, addWebsocket };
