import { AppState } from '../types/client';

const appStates = {
  loggedOut: 'LOGGED OUT',
  home: 'HOME',
};

const initialState = {
  currentState: appStates.loggedOut,
};

const appStateReducer = (appState = initialState, action: any): AppState => {
  switch (action.type) {
    case 'LOG OUT':
      return initialState;
    case 'GO TO HOME':
      return {
        ...appState,
        currentState: appStates.home,
      };
    default:
      return appState;
  }
};

export { appStateReducer, appStates };
