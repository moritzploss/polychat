/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require('chai');
const uuid = require('uuid/v4');

const { WebSocketService } = require('../../dist/services/webSockets');

const userId = uuid();
const webSocketId = `${userId}--${uuid()}`;
const webSocketId2 = `${userId}--${uuid()}`;
let webSocketService;

let webSocketData;
let webSocketData2;

const mockSocket = {
  send: () => { },
  close: () => { },
  open: () => { },
};

beforeEach(() => {
  webSocketData = { webSocketId, webSocket: mockSocket };
  webSocketData2 = { webSocketId: webSocketId2, webSocket: mockSocket };
  webSocketService = new WebSocketService();
});

describe('the WebSocket service addWebSocket function', () => {
  it('should associate a client with a user', () => {
    webSocketService.addWebSocket(webSocketId, mockSocket);
    expect(webSocketService.webSockets).haveOwnProperty(userId);
    expect(webSocketService.getWebSocketsByUserId(userId)).to.deep.equal([webSocketData]);
  });

  it('should associate multiple WebSockets with a user', () => {
    webSocketService.addWebSocket(webSocketId, mockSocket);
    webSocketService.addWebSocket(webSocketId2, mockSocket);
    const userWebSockets = webSocketService.getWebSocketsByUserId(userId);
    expect(userWebSockets).to.deep.equal([webSocketData, webSocketData2]);
  });
});

describe('the WebSocket service removeWebSocket function', () => {
  it('should remove a WebSocket from a users list', () => {
    webSocketService.addWebSocket(webSocketId, userId);
    webSocketService.addWebSocket(webSocketId, userId);
    webSocketService.removeWebSocket(webSocketId, userId);
    expect(webSocketService.getWebSocketsByUserId(userId)).not.contains(webSocketId);
  });
});
