import React, { useState } from 'react';
import { connect } from 'react-redux';
// import { sessionService } from 'redux-react-session';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faCog } from '@fortawesome/free-solid-svg-icons';

import { reducerActions } from '../reducers/rootActions';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps } from '../types/client';
import { NavLink } from 'react-router-dom';

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

  const [active, setActive] = useState(0);

  const navItems = [
    {
      icon: faHome,
      onClick: actions.goToHome,
    },
    {
      icon: faSearch,
      onClick: actions.goToUserSearch,
    },
    {
      icon: faCog,
      onClick: actions.goToSettings,
    },
  ];

  const onClick = (index: number, clickHandler: Function) => {
    setActive(index);
    clickHandler();
  };

  return (
    <nav className="navigation">
      {navItems.map((item, index) => (
        <FontAwesomeIcon
          className={`navigation_item${active === index ? '_active' : ''}`}
          icon={item.icon}
          onClick={(): void => onClick(index, item.onClick)}
        />
      ))}
    </nav>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(Navigation);
