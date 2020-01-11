import { ParcelService } from '../websockets/parcelService';

export interface Action {
  type: string;
}

export interface Client {
  parcelService: ParcelService | any;
}

export interface ReduxStoreContents {
  client: Record<string, any>;
  user: Record<string, string>;
  session: Record<string, any>;
}

export type UserData = Record<string, any>;

export type LoginResponseData = Record<string, any>;
