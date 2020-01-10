import { sessionService } from 'redux-react-session';

const validateSession = async (session: any): Promise<boolean> => {
  const res = await fetch('/api/validate-session', {
    credentials: 'include',
  });
  return res.status === 200;
};

const options = {
  refreshOnCheckAuth: true,
  redirectPath: '/login',
  driver: 'COOKIES',
  validateSession,
};

const initiateSessionService = (store: any): void => {
  sessionService.initSessionService(store, options)
    .then(() => console.log('Redux React Session is ready and a session was refreshed from your storage'))
    .catch(() => console.log('Redux React Session is ready and there is no session in your storage'));
};

export { initiateSessionService };
