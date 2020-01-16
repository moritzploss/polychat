/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import { clientActions } from '../reducers/clientActions';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { ReduxProps } from '../types/client';
import { appStates } from '../reducers/appState';

import ChatPartnerProfile from './ChatPartnerProfile';
import GDPR from './GDPR';
import MessageBoard from './MessageBoard';
import MessageEditor from './MessageEditor';
import Welcome from './Welcome';
import SelectAvatar from './SelectAvatar';

const MainArea = ({ actions, store }: ReduxProps): JSX.Element => {
  const { appState, client } = store;

  const wrap = (element: JSX.Element): JSX.Element => (
    <>
      <FontAwesomeIcon
        className="home_main_home-button"
        icon={faHome}
        onClick={actions.goToHome}
      />
      {element}
    </>
  );

  const messageArea = (
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

  const getMessageAreaContents = (): JSX.Element => {
    switch (appState.currentState) {
      case (appStates.gdpr):
        return wrap(<GDPR />);
      case (appStates.selectAvatar):
        return wrap(<SelectAvatar />);
      default:
        return !client.chatPartner.id
          ? <Welcome />
          : messageArea;
    }
  };

  return (
    <div className="home_main">
      {getMessageAreaContents()}
    </div>
  );
};

export default connect(mapStateToProps, clientActions, mergeProps)(MainArea);
