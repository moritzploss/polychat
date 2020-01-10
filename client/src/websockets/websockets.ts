const openNewWebSocket = (webSocketId: string): WebSocket => {
  const protocolPrefix = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const { host } = window.location;
  return new WebSocket(`${protocolPrefix}//${host}/api/websockets/clients/${webSocketId}`);
};

export { openNewWebSocket };
