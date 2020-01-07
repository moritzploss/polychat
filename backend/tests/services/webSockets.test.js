/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require('chai');
const uuid = require('uuid/v4');

const { WebSocketService } = require('../../dist/services/webSockets');

let webSocketId;
let userId;
let webSocketService;

beforeEach(() => {
  webSocketId = uuid();
  userId = uuid();
  webSocketService = new WebSocketService();
});

describe('the clients service add function', () => {
  it('should associate a client with a user', () => {
    webSocketService.addWebSocket(webSocketId, userId);
    expect(webSocketService.webSockets).haveOwnProperty(userId);
    expect(webSocketService.getWebSocketsByUserId(userId)).contains(webSocketId);
  });

  it('should associate multiple clients with a user', () => {
    const clientId2 = uuid();
    webSocketService.addWebSocket(webSocketId, userId);
    webSocketService.addWebSocket(clientId2, userId);
    expect(webSocketService.getWebSocketsByUserId(userId)).contains(webSocketId);
    expect(webSocketService.getWebSocketsByUserId(userId)).contains(clientId2);
    expect(webSocketService.getWebSocketsByUserId(userId).length).equals(2);
  });
});

describe('the clients service remove function', () => {
  it('should remove a client from a users list', () => {
    webSocketService.addWebSocket(webSocketId, userId);
    webSocketService.removeWebSocket(webSocketId, userId);
    expect(webSocketService.getWebSocketsByUserId(userId)).not.contains(webSocketId);
  });
});
