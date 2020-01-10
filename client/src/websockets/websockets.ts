// import { ParcelService } from './parcelService';

const getWebSocketRoute = (webSocketId: string): string => {
  const protocolPrefix = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const { host } = window.location;
  return `${protocolPrefix}//${host}/api/websockets/clients/${webSocketId}`;
};

const onmessage = ({ data }: MessageEvent): void => console.log(JSON.parse(data));

const openNewWebSocket = (webSocketId: string): WebSocket => {
  const webSocket = new WebSocket(getWebSocketRoute(webSocketId));
  webSocket.onmessage = onmessage;
  // webSocket.onopen = (event: Event): void => console.log(event);
  // webSocket.onclose = (event: Event): void => console.log(event);
  // webSocket.onerror = (event: Event): void => console.log(event);
  return webSocket;
};

export { openNewWebSocket };
