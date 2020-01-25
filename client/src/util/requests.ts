import { sessionService } from 'redux-react-session';
import { errorCallback } from './errors';

import { HttpRequestType } from '../types/applicationWide';
import { UserData } from '../types/types';

interface Args {
  errCallback: Function;
  successCallback?: Function;
  url: string;
  body: Record<string, any>;
  type: HttpRequestType;
}

const requestWithJsonBody = async ({
  errCallback,
  successCallback = (): void => { },
  url,
  body,
  type,
}: Args): Promise<void> => {
  const res = await fetch(url, {
    method: type,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const resBody = await res.json();
  return (resBody.error)
    ? errCallback(resBody)
    : successCallback(resBody);
};

const submitUserProfileChange = (userId: string, changes: UserData): Promise<void> => requestWithJsonBody({
  errCallback: errorCallback,
  successCallback: sessionService.saveUser,
  url: `/api/users/${userId}`,
  type: 'PUT',
  body: {
    userId,
    ...changes,
  },
});

type RequestBody = Record<string, any>;

interface RequestOptions {
  body?: string;
  method: HttpRequestType;
  headers: Record<string, string>;
}

const requestWithJsonBodyAsync = async (url: string, method: HttpRequestType, body: RequestBody = {}): Promise<RequestBody> => {
  const options: RequestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (method !== 'GET') {
    options.body = JSON.stringify(body);
  }
  const res = await fetch(url, options);
  return res.json();
};

const getRequest = async (url: string, searchParams: Record<string, string>): Promise<any> => {
  const params = new URLSearchParams(searchParams).toString();
  const urlWithParams = `${url}?${params}`;
  const res = await fetch(urlWithParams, { credentials: 'include' });
  return res.json();
};

const submitAvatarChange = (userId: string, avatarId: number): void => {
  submitUserProfileChange(userId, { avatar: `avatar-${avatarId}.svg` });
};

export { getRequest, requestWithJsonBody, submitUserProfileChange, submitAvatarChange, requestWithJsonBodyAsync };
