const appStateActions = {
  goToHome: (): { type: string } => ({
    type: 'GO TO HOME',
  }),

  logOut: (): { type: string } => ({
    type: 'LOG OUT',
  }),

  goToUserSearch: (): { type: string } => ({
    type: 'GO TO USER SEARCH',
  }),

  goToSettings: (): { type: string } => ({
    type: 'GO TO SETTINGS',
  }),

  goToGDPR: (): { type: string } => ({
    type: 'GO TO GDPR',
  }),
};

export { appStateActions };
