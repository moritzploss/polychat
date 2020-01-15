import { AppState } from '../types/client';

const appStates = {
  loggedOut: 'LOGGED OUT',
  home: 'HOME',
  userSearch: 'USER SEARCH',
  settings: 'SETTINGS',
};

const initialState = {
  currentState: appStates.loggedOut,
};

const appStateReducer = (appState = initialState, action: any): AppState => {
  switch (action.type) {
    case 'LOG OUT':
      return initialState;
    case 'GO TO HOME':
      console.log(action);
      return {
        ...appState,
        currentState: appStates.home,
      };
    case 'GO TO USER SEARCH':
      return {
        ...appState,
        currentState: appStates.userSearch,
      };
    case 'GO TO SETTINGS':
      return {
        ...appState,
        currentState: appStates.settings,
      };
    default:
      return appState;
  }
};

export { appStateReducer, appStates };
