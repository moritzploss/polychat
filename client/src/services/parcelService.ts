import { Parcel } from '../types/applicationWide';

class ParcelService {
  webSocket: WebSocket;

  actions: Record<string, Function>;

  constructor(webSocket: WebSocket, actions: Record<string, Function>) {
    this.webSocket = webSocket;
    this.webSocket.onmessage = ({ data }: MessageEvent): void => this.receive(data);
    this.actions = actions;
  }

  deliver = (parcel: Parcel): void => {
    this.webSocket.send(JSON.stringify(parcel));
  };

  receive = (data: string): void => {
    const parcel = JSON.parse(data);
    console.log(parcel);
    switch (parcel.type) {
      case 'DIRECT MESSAGE':
        return this.actions.addDirectMessage(parcel);
      case 'REPLACE MESSAGE HISTORY':
        return this.actions.replaceMessageHistory(parcel);
      case 'UPDATE CONTACTLIST':
        return this.actions.updateContactList(parcel);
      case 'UPDATE CONNECTED USERS':
        return this.actions.updateConnectedUsers(parcel);
      default:
        return console.log(parcel);
    }
  };

  close = (): void => this.webSocket.close();
}

export { ParcelService };