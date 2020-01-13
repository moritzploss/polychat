import { Parcel } from '../types/types';

const messageActions = {
  addDirectMessage: (parcel: Parcel): { type: string; parcel: Parcel } => ({
    type: 'ADD DIRECTMESSAGE',
    parcel,
  }),
};

export { messageActions };
