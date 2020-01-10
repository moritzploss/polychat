// import * as ws from 'ws';

import { Parcel } from '../types';

class ParcelService {
  webSocket: WebSocket;

  constructor(webSocket: WebSocket) {
    this.webSocket = webSocket;
  }

  deliver = (parcel: Parcel): void => this.webSocket.send(JSON.stringify(parcel));

  receive = (parcel: Parcel): void => {
    switch (parcel.type) {
      case 'DIRECT MESSAGE':
        return this.deliver(parcel);
      default:
        return console.log(parcel);
    }
  };
}

export { ParcelService };
