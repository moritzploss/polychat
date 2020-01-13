import { ParcelService } from '../services/parcelService';

const parcelServiceActions = {
  addParcelService: (websocket: WebSocket, actions: Record<string, Function>): { type: string; parcelService: ParcelService } => ({
    type: 'ADD PARCELSERVICE',
    parcelService: new ParcelService(websocket, actions),
  }),

  removeParcelService: (): { type: string } => ({
    type: 'REMOVE PARCELSERVICE',
  }),
};

export { parcelServiceActions };
