import * as ws from 'ws';
import * as mongoose from 'mongoose';

import { WebSocketData } from '../types/backend';
import { Parcel, DirectMessageParcel } from '../types/applicationWide';

import { logger } from '../logging';
import { webSocketService, WebSocketService } from './webSocketService';
import { repository, Repository } from './repository';
import { toCredentials } from '../controllers/login';
import { contactListParcel, messageHistoryParcel } from '../parcels/blueprints';

const logUnknownParcel = (parcel: Parcel): void => {
  logger.info({
    message: `received parcel of unknown type ${parcel.type}`,
    parcel,
  });
};

class ParcelService {
  webSocketService: WebSocketService;

  repository: Repository;

  constructor(wsService: WebSocketService, repositoryService: Repository) {
    this.webSocketService = wsService;
    this.repository = repositoryService;
  }

  deliverMessageHistoryParcel = (userId: string): void => {
    this.repository.getUserMessages(userId, (messages: Record<string, any>) => (
      this.deliver(messageHistoryParcel(userId, messages))
    ));
  };

  deliverContactListParcel = (userId: string): void => this.repository.getUserContacts(
    userId, (contacts: string[]) => this.repository.getUsersById(
      contacts, (users: mongoose.Document[]) => this.deliver(
        contactListParcel(userId, users.map(toCredentials)),
      ),
    ),
  );

  broadcastContactListUpdateToUserContacts = (userId: string): void => {
    repository.getUserContacts(userId, (contacts: string[]) => {
      contacts.forEach((contact: string) => this.deliverContactListParcel(contact));
    });
  };

  broadCast = (parcel: Parcel): void => {
    this.webSocketService
      .getAllWebSockets()
      .forEach(({ webSocket }: { webSocket: ws}) => webSocket.send(JSON.stringify(parcel)));
  };

  deliver = (parcel: Parcel): void => {
    this.webSocketService
      .getWebSocketsByUserId(parcel.receiverId)
      .map(({ webSocket }: WebSocketData) => webSocket)
      .forEach((webSocket: ws) => webSocket.send(JSON.stringify(parcel)));
  };

  receive = (parcel: Parcel): void => {
    switch (parcel.type) {
      case 'DIRECT MESSAGE':
        this.repository.saveDirectMessage(parcel as DirectMessageParcel);
        return this.deliver(parcel);
      default:
        return logUnknownParcel(parcel);
    }
  };
}

const parcelService = new ParcelService(webSocketService, repository);

export { ParcelService, parcelService };
