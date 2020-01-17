import { appStateActions } from './appStateActions';
import { clientActions } from './clientActions';
import { messageActions } from './messagesActions';
import { parcelServiceActions } from './parcelServiceActions';

const rootActions = {
  logOut: (): { type: string } => ({
    type: 'USER LOGOUT',
  }),
};

const reducerActions = {
  ...appStateActions,
  ...clientActions,
  ...messageActions,
  ...parcelServiceActions,
  ...rootActions,
};

export { reducerActions };
