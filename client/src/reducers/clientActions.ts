import { ParcelService } from '../services/parcelService';
import { Parcel } from '../types';

const clientActions = {
  addParcelService: (websocket: WebSocket, actions: Record<string, Function>): { type: string; parcelService: ParcelService } => ({
    type: 'ADD PARCELSERVICE',
    parcelService: new ParcelService(websocket, actions),
  }),

  initiateMessageStore: (): { type: string } => ({
    type: 'INITIATE MESSAGESTORE',
  }),

  addDirectMessage: (parcel: Parcel): { type: string; parcel: Parcel } => ({
    type: 'ADD DIRECTMESSAGE',
    parcel,
  }),

  updateConnectedUsers: (parcel: Parcel): { type: string; connectedUsers: string[] } => ({
    type: 'UPDATE CONNECTED USERS',
    connectedUsers: parcel.body.connectedUsers ? parcel.body.connectedUsers : [],
  }),

  removeParcelService: (): { type: string } => ({
    type: 'REMOVE PARCELSERVICE',
  }),
};

export { clientActions };
