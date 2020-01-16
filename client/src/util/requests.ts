import { HttpRequestType } from '../types/applicationWide';

interface Args {
  errCallback: Function;
  successCallback?: Function;
  url: string;
  body: Record<string, any>;
  type: HttpRequestType;
}

const requestWithJsonBody = async({ errCallback, successCallback = (): void => { }, url, body, type }: Args): Promise<void> => {
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

export { requestWithJsonBody };
