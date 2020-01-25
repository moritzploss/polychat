import React, { useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import { reducerActions } from '../reducers/rootActions';
import { ReduxProps } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { openNewWebSocket } from '../websockets/websockets';
import { UserData } from '../types/applicationWide';
import { appStates } from '../reducers/appState';

import ContactList from './ContactList';
// import ContactListWaiting from './ContactListWaiting';
import ContactSearch from './ContactSearch';
import MainArea from './MainArea';
import Settings from './Settings';
import SideBar from './SideBar';

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

  const contactList = (
    <>
      {/* <ContactListWaiting
        clickHandler={(user: UserData): void => {
          actions.setChatPartner(user);
          actions.goToHome();
        }}
      /> */}
      <ContactList
        contactList={client.contactList}
        clickHandler={(user: UserData): void => {
          actions.setChatPartner(user);
          actions.goToHome();
        }}
      />
    </>
  );

  const getSideBarContents = (): JSX.Element => {
    switch (appState.currentState) {
      case (appStates.settings):
        return <Settings />;
      case (appStates.gdpr):
        return <Settings />;
      case (appStates.userSearch):
        return <ContactSearch />;
      default:
        return contactList;
    }
  };

  const viewMobile = client.chatPartner.id
    || (appState.currentState === appStates.gdpr)
    || (appState.currentState === appStates.selectAvatar)
    ? <MainArea />
    : <SideBar content={getSideBarContents()} />;

  const viewDesktop = (
    <>
      <SideBar content={getSideBarContents()} />
      <MainArea />
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
