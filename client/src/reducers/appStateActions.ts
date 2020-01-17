const appStateActions = {
  goToHome: (): { type: string } => ({
    type: 'GO TO HOME',
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

  goToAvatarSelection: (): { type: string } => ({
    type: 'GO TO AVATAR SELECTION',
  }),
};

export { appStateActions };
