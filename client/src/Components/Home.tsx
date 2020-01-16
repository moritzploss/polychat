import React, { useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import { reducerActions } from '../reducers/rootActions';
import { ReduxProps } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { openNewWebSocket } from '../websockets/websockets';
import { appStates } from '../reducers/appState';

import ChatPartnerProfile from './ChatPartnerProfile';
import ContactList from './ContactList';
import ContactSearch from './ContactSearch';
import MessageBoard from './MessageBoard';
import MessageEditor from './MessageEditor';
import Navigation from './Navigation';
import Settings from './Settings';
import UserProfile from './UserProfile';
import Welcome from './Welcome';

const generateWebSocketId = (userId: string): string => `${userId}--${uuid()}`;

const Home = ({ store, actions }: ReduxProps): JSX.Element => {
  const { session, parcelService, client, appState } = store;
  const [windowWith, setWindowWith] = useState(0);

  useLayoutEffect(() => {
    const updateSize = (): void => setWindowWith(window.innerWidth);
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
        return (
          <ContactList
            contactList={client.contactList}
            clickHandler={actions.setChatPartner}
          />
        );
    }
  };

  const sideBar = (
    <div className="home_sidebar">
      <UserProfile />
      {getSideBarContents()}
      <Navigation />
    </div>
  );

  const messageAreaContents = !client.chatPartner.id
    ? <Welcome />
    : (
      <>
        <FontAwesomeIcon
          className="home_main_home-button"
          icon={faHome}
          onClick={actions.resetChatPartner}
        />
        <ChatPartnerProfile />
        <MessageBoard />
        <MessageEditor />
      </>
    );

  const messageArea = (
    <div className="home_main">
      {messageAreaContents}
    </div>
  );

  const viewMobile = client.chatPartner.id
    ? <>{messageArea}</>
    : <>{sideBar}</>;

  const viewDesktop = (
    <>
      {sideBar}
      {messageArea}
    </>
  );

  return (
    <div className="home">
      {windowWith < 600
        ? <>{viewMobile}</>
        : <>{viewDesktop}</>}
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(Home);
