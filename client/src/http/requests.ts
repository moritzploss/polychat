const postRequestJson = async (errCallback: Function, successCallback: Function, url: string, reqBody: any): Promise<void> => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody),
  });

  const resBody = await res.json();
  return (resBody.error)
    ? errCallback(resBody)
    : successCallback(resBody);
};

const putRequestJson = async (errCallback: Function, successCallback: Function, url: string, reqBody: any): Promise<void> => {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody),
  });

  const resBody = await res.json();
  return (resBody.error)
    ? errCallback(resBody)
    : successCallback(resBody);
};


const deleteRequestJson = async (errCallback: Function, successCallback: Function, url: string, reqBody: any): Promise<void> => {
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody),
  });

  const resBody = await res.json();
  return (resBody.error)
    ? errCallback(resBody)
    : successCallback(resBody);
};

export { putRequestJson, postRequestJson, deleteRequestJson };
