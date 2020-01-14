import { appStateActions } from './appStateActions';
import { clientActions } from './clientActions';
import { messageActions } from './messagesActions';
import { parcelServiceActions } from './parcelServiceActions';

const reducerActions = {
  ...appStateActions,
  ...clientActions,
  ...messageActions,
  ...parcelServiceActions,
};

export { reducerActions };
