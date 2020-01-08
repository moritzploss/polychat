import { Client } from '../types';

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
