import { Client } from '../types/types';

const initialState = { parcelService: { close: (): void => { } } };

const clientReducer = (client = initialState, action: any): Client => {
  switch (action.type) {
    case 'ADD PARCELSERVICE':
      return {
        ...client,
        parcelService: action.parcelService,
      };
    case 'REMOVE PARCELSERVICE':
      client.parcelService.close();
      return {
        ...client,
        parcelService: initialState.parcelService,
      };
    default:
      return client;
  }
};

export { clientReducer };
