import {
  Store, ReducerActions, ReduxProps, Props,
} from '../types/client';

const mapStateToProps = (store: Store): Store => store;

const mergeProps = (store: Store, actions: ReducerActions, ownProps: Props): ReduxProps => ({
  store,
  actions,
  ownProps,
});

export { mapStateToProps, mergeProps };
