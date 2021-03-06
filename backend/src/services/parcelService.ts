import * as ws from 'ws';

import { WebSocketData } from '../types/backend';
import { Parcel, DirectMessageParcel } from '../types/applicationWide';

import { logger } from '../logging';
import { webSocketService, WebSocketService } from './webSocketService';
import { repository, Repository } from './repository';
import { toUserData } from '../controllers/login';
import { contactListParcel, messageHistoryParcel } from '../parcels/blueprints';
import { TranslationService, translationService } from './translationService';

const logUnknownParcel = (parcel: Parcel): void => {
  logger.info({
    message: `received parcel of unknown type ${parcel.type}`,
    parcel,
  });
};

class ParcelService {
  webSocketService: WebSocketService;

  repository: Repository;

  translationService: TranslationService;

  constructor(wsService: WebSocketService, repositoryService: Repository, translateService: TranslationService) {
    this.webSocketService = wsService;
    this.repository = repositoryService;
    this.translationService = translateService;
  }

  deliverMessageHistoryParcel = async (userId: string): Promise<void> => {
    const messages = await this.repository.getUserMessages(userId);
    this.deliver(messageHistoryParcel(userId, messages));
  };

  deliverContactListParcel = async (userId: string): Promise<void> => {
    const contacts = await this.repository.getUserContacts(userId);
    const users = await this.repository.getUsersById(contacts);
    this.deliver(contactListParcel(userId, users.map(toUserData)));
  };

  broadcastContactListUpdateToUserContacts = async (userId: string): Promise<void> => {
    const contacts = await repository.getUserContacts(userId);
    contacts.forEach((contact: string) => this.deliverContactListParcel(contact));
  };

  deliver = (parcel: Parcel): void => {
    this.webSocketService
      .getWebSocketsByUserId(parcel.receiverId)
      .map(({ webSocket }: WebSocketData) => webSocket)
      .forEach((webSocket: ws) => webSocket.send(JSON.stringify(parcel)));
  };

  translateDirectMessageParcel = async (parcel: DirectMessageParcel): Promise<DirectMessageParcel> => {
    const directMsgParcel = parcel as DirectMessageParcel;
    const targetLanguage = await repository.getUserLanguage(parcel.receiverId);
    const translatedMessage = await this.translationService.translateString(
      directMsgParcel.message,
      targetLanguage,
    );
    return { ...directMsgParcel, translatedMessage };
  };

  receive = async (parcel: Parcel): Promise<void> => {
    switch (parcel.type) {
      case 'DIRECT MESSAGE':
        // eslint-disable-next-line no-case-declarations
        const parcelTranslated = await this.translateDirectMessageParcel(parcel as DirectMessageParcel);
        this.repository.saveDirectMessage(parcelTranslated);
        return this.deliver(parcelTranslated);
      default:
        return logUnknownParcel(parcel);
    }
  };
}

const parcelService = new ParcelService(webSocketService, repository, translationService);

export { ParcelService, parcelService };
