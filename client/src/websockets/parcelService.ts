import { Parcel } from '../types';

class ParcelService {
  webSocket: WebSocket;

  constructor(webSocket: WebSocket) {
    this.webSocket = webSocket;
    this.webSocket.onmessage = ({ data }: MessageEvent): void => this.receive(JSON.parse(data));
  }

  deliver = (parcel: Parcel): void => this.webSocket.send(JSON.stringify(parcel));

  receive = (parcel: Parcel): void => {
    switch (parcel.type) {
      case 'DIRECT MESSAGE':
        return console.log(parcel);
      case 'SETUP CLIENT':
        return console.log(parcel);
      default:
        return console.log(parcel);
    }
  };

  close = (): void => this.webSocket.close();
}

export { ParcelService };
