import { appStateActions } from './appStateActions';
import { clientActions } from './clientActions';
import { messageActions } from './messagesActions';
import { parcelServiceActions } from './parcelServiceActions';

const actions = {
  ...appStateActions,
  ...clientActions,
  ...messageActions,
  ...parcelServiceActions,
};

export { actions };
