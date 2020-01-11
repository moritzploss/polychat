const getWebSocketRoute = (webSocketId: string): string => {
  const protocolPrefix = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const { host } = window.location;
  return `${protocolPrefix}//${host}/api/websockets/clients/${webSocketId}`;
};

const openNewWebSocket = (webSocketId: string): WebSocket => {
  const webSocket = new WebSocket(getWebSocketRoute(webSocketId));
  return webSocket;
};

export { openNewWebSocket };
