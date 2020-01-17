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
    switch (parcel.type) {
      case 'DIRECT MESSAGE':
        console.log(parcel);
        return this.actions.addDirectMessage(parcel);
      case 'REPLACE MESSAGE HISTORY':
        return this.actions.replaceMessageHistory(parcel);
      case 'UPDATE CONTACTLIST':
        this.actions.updateContactList(parcel);
        return this.actions.reloadChatPartner();
      case 'UPDATE CONNECTED USERS':
        this.actions.updateConnectedUsers(parcel);
        return this.actions.reloadChatPartner();
      default:
        return console.log(parcel);
    }
  };

  close = (): void => this.webSocket.close();
}

export { ParcelService };
