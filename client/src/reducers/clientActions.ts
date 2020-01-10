import { openNewWebSocket } from '../websockets/websockets';

const addWebsocket = (userId: string): { type: string; websocket: WebSocket } => ({
  type: 'ADD WEBSOCKET',
  websocket: openNewWebSocket(userId),
});

const removeWebsocket = (): { type: string } => ({
  type: 'REMOVE WEBSOCKET',
});

export { addWebsocket, removeWebsocket };
