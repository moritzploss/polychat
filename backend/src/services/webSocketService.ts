import * as ws from 'ws';

import { WebSocketData } from '../types/backend';

class WebSocketService {
  webSockets: { [x: string]: WebSocketData[] };

  constructor() {
    this.webSockets = {};
  }

  addWebSocket = (webSocketId: string, webSocket: ws): void => {
    const userId = this.getUserId(webSocketId);
    const webSocketData = { webSocket, webSocketId };
    this.webSockets[userId] = this.webSockets[userId]
      ? [...this.webSockets[userId], webSocketData]
      : [webSocketData];
  };

  hasWebSockets = (userId: string): boolean => (
    Boolean(this.getWebSocketsByUserId(userId).length)
  );

  getWebSocketsByUserId = (userId: string): WebSocketData[] => (
    this.webSockets[userId]
      ? this.webSockets[userId]
      : []
  );

  getAllWebSockets = (): WebSocketData[] => {
    let webSocketData = [];
    Object.values(this.webSockets).forEach((dataSet: WebSocketData[]) => {
      webSocketData = [...webSocketData, ...dataSet];
    });
    return webSocketData;
  };

  getUserId = (webSocketId: string): string => webSocketId.split('--')[0];

  getConnectedUsers = (): string[] => Object.keys(this.webSockets);

  removeWebSocket = (webSocketId: string): void => {
    const userId = this.getUserId(webSocketId);
    this.webSockets[userId] = this.webSockets[userId].filter(({ webSocketId: id }) => id !== webSocketId);
    if (this.webSockets[userId].length === 0) {
      this.removeUser(userId);
    }
  };

  removeUser = (userId: string): boolean => delete this.webSockets[userId];
}

const webSocketService = new WebSocketService();

export { webSocketService, WebSocketService };
