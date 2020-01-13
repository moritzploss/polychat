const initialState = {
  close: (): void => { },
};

const parcelServiceReducer = (parcelService = initialState, action: any) => {
  switch (action.type) {
    case 'ADD PARCELSERVICE':
      return action.parcelService;
    case 'REMOVE PARCELSERVICE':
      parcelService.close();
      return initialState;
    default:
      return parcelService;
  }
};

export { parcelServiceReducer };
