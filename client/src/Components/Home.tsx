/* eslint-disable react/prop-types */
import React, { useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faCog } from '@fortawesome/free-solid-svg-icons';

import { reducerActions } from '../reducers/rootActions';
import { ReduxProps } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { openNewWebSocket } from '../websockets/websockets';
import { appStates } from '../reducers/appState';

import Navigation from './Navigation';
import ContactList from './ContactList';
import MessageBoard from './MessageBoard';
import MessageEditor from './MessageEditor';
import ContactSearch from './ContactSearch';
import UserProfile from './UserProfile';
import ChatPartnerProfile from './ChatPartnerProfile';
import Settings from './Settings';
import Welcome from './Welcome';

const generateWebSocketId = (userId: string): string => `${userId}--${uuid()}`;

const Home = ({ store, actions }: ReduxProps): JSX.Element => {
  const { session, parcelService, client, appState } = store;
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return (): void => window.removeEventListener('resize', updateSize);
  }, []);

  if (session.user.id && !parcelService.webSocket) {
    const webSocket = openNewWebSocket(generateWebSocketId(session.user.id));
    actions.addParcelService(webSocket, actions);
  }

  const getSideBarContents = (): JSX.Element => {
    switch (appState.currentState) {
      case (appStates.settings):
        return <Settings />;
      case (appStates.userSearch):
        return <ContactSearch />;
      default:
        return <ContactList contactList={client.contactList} clickHandler={actions.setChatPartner} />;
    }
  };

  const getMainContents = (): JSX.Element => {
    return !client.chatPartner.id
      ? <Welcome />
      : (
        <>
          <FontAwesomeIcon className="home_main_home-button" icon={faHome} onClick={actions.resetChatPartner} />
          <ChatPartnerProfile />
          <MessageBoard />
          <MessageEditor />
        </>
      );
  };

  const sideBar = (
    <div className="home_sidebar">
      <UserProfile />
      {getSideBarContents()}
      <Navigation />
    </div>
  );

  const mainView = (
    <div className="home_main">
      {getMainContents()}
    </div>
  );

  const pageViewMobile = client.chatPartner.id
    ? <>{mainView}</>
    : <>{sideBar}</>;

  const getView = size[0] < 600
    ? <>{pageViewMobile}</>
    : (
      <>
        {sideBar}
        {mainView}
      </>
    );

  return (
    <div className="home">
      {getView}
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(Home);
