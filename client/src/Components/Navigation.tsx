import React from 'react';
import { connect } from 'react-redux';
// import { sessionService } from 'redux-react-session';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faCog } from '@fortawesome/free-solid-svg-icons';

import { reducerActions } from '../reducers/rootActions';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps } from '../types/client';

// const logout = async (removeParcelService: Function): Promise<void> => {
//   const res = await fetch('/api/destroy-session');
//   if (res.status === 200) {
//     await sessionService.deleteUser();
//     await sessionService.deleteSession();
//     removeParcelService();
//   }
// };

const Navigation = ({ actions }: ReduxProps): JSX.Element => {
  // const resetApp = (): void => {
  //   actions.removeParcelService();
  //   actions.logOut();
  // };

  return (
    <div className="navigation">
      <FontAwesomeIcon className="navigation_item" icon={faHome} onClick={actions.goToHome} />
      <FontAwesomeIcon className="navigation_item" icon={faSearch} onClick={actions.goToUserSearch} />
      <FontAwesomeIcon className="navigation_item" icon={faCog} onClick={actions.goToSettings} />
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(Navigation);
