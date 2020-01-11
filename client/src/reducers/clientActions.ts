import { ParcelService } from '../websockets/parcelService';

const addParcelService = (websocket: WebSocket): { type: string; parcelService: ParcelService } => ({
  type: 'ADD PARCELSERVICE',
  parcelService: new ParcelService(websocket),
});

const removeParcelService = (): { type: string } => ({
  type: 'REMOVE PARCELSERVICE',
});

export { addParcelService, removeParcelService };
