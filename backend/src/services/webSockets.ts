export class WebSocketService {
  webSockets: { [x: string]: string[] };

  constructor() {
    this.webSockets = {};
  }

  addWebSocket = (webSocketId: string, userId: string): void => {
    this.webSockets[userId] = this.webSockets[userId]
      ? [...this.webSockets[userId], webSocketId]
      : [webSocketId];
  };

  removeWebSocket = (clientId: string, userId: string): void => {
    this.webSockets[userId] = this.webSockets[userId].filter((id: string) => id !== clientId);
  };

  removeUser = (userId: string): boolean => delete this.webSockets[userId];

  hasWebSockets = (userId: string): boolean => (
    Boolean(this.getWebSocketsByUserId(userId).length)
  );

  getWebSocketsByUserId = (userId: string): string[] => (
    this.webSockets[userId]
      ? this.webSockets[userId]
      : []
  );
}

export const webSockets = new WebSocketService();
