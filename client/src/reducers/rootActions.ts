import { clientActions } from './clientActions';
import { messageActions } from './messagesActions';
import { parcelServiceActions } from './parcelServiceActions';

const actions = {
  ...clientActions,
  ...messageActions,
  ...parcelServiceActions,
};

export { actions };
