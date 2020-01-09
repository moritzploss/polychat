import { Client } from '../types/types';

const clientReducer = (client = {}, action: any): Client => {
  switch (action.type) {
    case 'ADD WEBSOCKET':
      return {
        ...client,
        websocket: action.websocket,
      };
    default:
      return client;
  }
};

export { clientReducer };
