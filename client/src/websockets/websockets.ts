import uuid from 'uuid/v4';

const getNewWebSocketId = (userId: string) => `${userId}--${uuid()}`

const openNewWebSocket = (userId: string): WebSocket => {
  const protocolPrefix = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const { host } = window.location;
  const webSocketId = getNewWebSocketId(userId);
  return new WebSocket(`${protocolPrefix}//${host}/api/websockets/clients/${webSocketId}`);
}

export { openNewWebSocket }