import { Parcel } from '../types/types';

const messageActions = {
  addDirectMessage: (parcel: Parcel): { type: string; parcel: Parcel } => ({
    type: 'ADD DIRECTMESSAGE',
    parcel,
  }),

  replaceMessageHistory: (parcel: Parcel): { type: string; messages: Parcel[] } => ({
    type: 'REPLACE MESSAGE HISTORY',
    messages: parcel.body.messages ? parcel.body.messages : [],
  }),
};

export { messageActions };
