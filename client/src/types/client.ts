import { UserCredentials, Messages } from './applicationWide';
import { ParcelService } from '../services/parcelService';
import { reducerActions } from '../reducers/rootActions';
import { appStateActions } from '../reducers/appStateActions';

export type ReactChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type ReactMouseEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

export interface Action {
  type: string;
}

export type AppStateActions = typeof appStateActions;

export type ReducerActions = typeof reducerActions;

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
  actions: ReducerActions;
  ownProps: Props;
}
