/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require('chai');
const uuid = require('uuid/v4');

const { WebSocketService } = require('../../dist/services/webSockets');
const { ParcelService } = require('../../dist/services/parcels');

const userId = uuid();
let parcelService;
let webSocketService;

beforeEach(() => {
  webSocketService = new WebSocketService();
  parcelService = new ParcelService(webSocketService);
});

describe('the ParcelService deliver function', () => {
  it('should send a parcel to all webSockets of a receiver', () => {
    let countReceivingWebSockets = 0;
    const webSocket = {
      send: () => { countReceivingWebSockets += 1; },
    };
    webSocketService.addWebSocket(userId, webSocket);
    webSocketService.addWebSocket(userId, webSocket);
    const parcel = {
      type: 'DIRECT MESSAGE',
      receiverId: userId,
      senderId: '123',
    };
    parcelService.deliver(parcel);
    expect(countReceivingWebSockets).to.equal(2);
  });
});
