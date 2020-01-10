/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require('chai');
const uuid = require('uuid/v4');

const { authenticateWebSocket } = require('../../dist/controllers/webSockets');
const { mockSocket } = require('../mocks');

const userId = uuid();

describe('the authenticateWebSocket function', () => {
  it('should return next() for authenticated requests', () => {
    const authorizedRequest = {
      params: { id: userId },
      session: {
        userId,
        authorized: true,
      },
    };
    const returnValue = authenticateWebSocket(mockSocket, authorizedRequest, () => true);
    expect(returnValue).to.be.true;
  });
  it('should close websocket for unauthenticated requests', () => {
    const unauthorizedRequest1 = {
      params: { id: '123' },
      session: {
        userId,
        authorized: true,
      },
    };
    const unauthorizedRequest2 = {
      params: { id: userId },
      session: {
        authorized: true,
      },
    };
    const unauthorizedRequest3 = {
      params: { id: userId },
      session: {
        userId,
        authorized: false,
      },
    };
    const webSocket = {
      ...mockSocket,
      close: () => false,
    };
    expect(authenticateWebSocket(webSocket, unauthorizedRequest1, () => true)).to.be.false;
    expect(authenticateWebSocket(webSocket, unauthorizedRequest2, () => true)).to.be.false;
    expect(authenticateWebSocket(webSocket, unauthorizedRequest3, () => true)).to.be.false;
  });
});
