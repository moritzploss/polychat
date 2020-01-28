import { sessionService } from 'redux-react-session';

const validateSession = async (): Promise<boolean> => {
  const res = await fetch('/api/sessions', {
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
    .then(() => console.log('Found and refreshed session from storage'))
    .catch(() => console.log('No session found'));
};

export { initiateSessionService };
