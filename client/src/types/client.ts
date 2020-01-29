import { UserData, Messages, HttpRequestType } from './applicationWide';
import { ParcelService } from '../services/parcelService';
import { reducerActions } from '../reducers/rootActions';
import { appStateActions } from '../reducers/appStateActions';

export type ReactChangeEvent = React.ChangeEvent<any>;
export type ReactMouseEvent = React.MouseEvent<any, MouseEvent>;

export interface Action {
  type: string;
}

export type AppStateActions = typeof appStateActions;

export type ReducerActions = typeof reducerActions;

export interface LanguageInfo {
  code: string;
  name: string;
}

export interface AppState {
  currentState: string;
}

export interface Client {
  connectedUsers: string[];
  contactList: UserData[];
  chatPartner: UserData;
}

export interface Session {
  user: UserData;
  authenticated: boolean;
  checked: boolean;
  invalid: boolean;
}

export type Props = Record<string, any>;

export type RequestBody = Record<string, any>;

export interface RequestOptions {
  body?: string;
  method: HttpRequestType;
  headers: Record<string, string>;
}

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
