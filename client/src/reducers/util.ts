import { Store, ReducerActions, ReduxProps, Props } from '../types/client';

const mapStateToProps = (store: Store): Store => store;

const mergeProps = (store: Store, reducerActions: ReducerActions, ownProps: Props): ReduxProps => ({
  store,
  reducerActions,
  ownProps,
});

export { mapStateToProps, mergeProps };
