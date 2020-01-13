const appStateActions = {
  goToHome: (): { type: string } => ({
    type: 'GO TO HOME',
  }),

  logOut: (): { type: string } => ({
    type: 'LOG OUT',
  }),
};

export { appStateActions };
