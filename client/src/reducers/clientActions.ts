import { openNewWebSocket } from '../websockets/websockets';

const addWebsocket = (userId: string): { type: string; websocket: WebSocket } => ({
  type: 'ADD WEBSOCKET',
  websocket: openNewWebSocket(userId),
});

export { addWebsocket };
