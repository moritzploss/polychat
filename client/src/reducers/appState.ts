import { AppState } from '../types/client';

const appStates = {
  loggedOut: 'LOGGED OUT',
  home: 'HOME',
  userSearch: 'USER SEARCH',
  settings: 'SETTINGS',
  gdpr: 'GDPR',
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
    case 'GO TO GDPR':
      return {
        ...appState,
        currentState: appStates.gdpr,
      };
    default:
      return appState;
  }
};

export { appStateReducer, appStates };
