/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

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

  if (session.user.id && !parcelService.webSocket) {
    const webSocket = openNewWebSocket(generateWebSocketId(session.user.id));
    actions.addParcelService(webSocket, actions);
  }

  const getView = (): JSX.Element => {
    switch (appState.currentState) {
      case (appStates.settings):
        return <Settings />;
      case (appStates.userSearch):
        return <ContactSearch />;
      default:
        return <ContactList contactList={client.contactList} clickHandler={actions.setChatPartner} />;
    }
  };

  return (
    <div className="home">
      <div className="home_sidebar">
        <UserProfile />
        {getView()}
        <Navigation />
      </div>
      <div className="home_main">
        {!client.chatPartner.id
          ? <Welcome />
          : (
            <>
              <ChatPartnerProfile />
              <MessageBoard />
              <MessageEditor />
            </>
          )}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(Home);
