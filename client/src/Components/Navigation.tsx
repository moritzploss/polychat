import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faCog } from '@fortawesome/free-solid-svg-icons';

import { reducerActions } from '../reducers/rootActions';
import { appStates } from '../reducers/appState';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps } from '../types/client';

const Navigation = ({ actions, store }: ReduxProps): JSX.Element => {
  const { currentState } = store.appState;

  const navItems = [
    {
      icon: faHome,
      onClick: actions.goToHome,
      isActive: currentState === appStates.home,
    },
    {
      icon: faSearch,
      onClick: actions.goToUserSearch,
      isActive: currentState === appStates.userSearch,
    },
    {
      icon: faCog,
      onClick: actions.goToSettings,
      isActive: (currentState === appStates.settings) || (currentState === appStates.gdpr),
    },
  ];

  return (
    <nav className="navigation">
      {navItems.map((item, index) => (
        <FontAwesomeIcon
          className={`navigation_item${item.isActive ? '_active' : ''}`}
          key={Math.random()}
          icon={item.icon}
          onClick={item.onClick}
        />
      ))}
    </nav>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(Navigation);
