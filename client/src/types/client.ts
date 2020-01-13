import { UserCredentials, Messages } from './applicationWide';
import { ParcelService } from '../services/parcelService';
import { actions } from '../reducers/rootActions';

export interface Action {
  type: string;
}

export type ReducerActions = typeof actions;

export interface AppState {
  currentState: string;
}

export interface Client {
  connectedUsers: string[];
  contactList: UserCredentials[];
  chatPartner: string;
}

export interface Session {
  user: UserCredentials;
  authenticated: boolean;
  checked: boolean;
  invalid: boolean;
}

export type Props = Record<string, any>;

export interface Store {
  appState: AppState;
  client: Client;
  session: Session;
  messages: Messages;
  parcelService: ParcelService;
}

export interface ReduxProps {
  store: Store;
  reducerActions: ReducerActions;
  ownProps: Props;
}
