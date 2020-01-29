import { sessionService } from 'redux-react-session';
import * as R from 'ramda';

import { HttpRequestType } from '../types/applicationWide';
import { UserData } from '../types/types';
import { RequestBody, RequestOptions } from '../types/client';

const httpRequest = async (url: string, method: HttpRequestType, body: RequestBody = {}): Promise<RequestBody> => {
  const options: RequestOptions = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (method !== 'GET' && !R.isEmpty(body)) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  return res.json();
};

const getRequest = async (url: string, searchParams: Record<string, string>): Promise<RequestBody> => {
  const params = new URLSearchParams(searchParams).toString();
  const urlWithParams = `${url}?${params}`;
  return httpRequest(urlWithParams, 'GET');
};

const submitUserProfileChange = async (userId: string, changes: UserData): Promise<void> => {
  const { error, ...user } = await httpRequest(
    `/api/users/${userId}`,
    'PUT',
    {
      userId,
      ...changes,
    },
  );

  if (!error) {
    sessionService.saveUser(user as UserData);
  }
};

const submitAvatarChange = (userId: string, avatarId: number): void => {
  submitUserProfileChange(userId, { avatar: `avatar-${avatarId}.svg` });
};

export { getRequest, submitUserProfileChange, submitAvatarChange, httpRequest };
