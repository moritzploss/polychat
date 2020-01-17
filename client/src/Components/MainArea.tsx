/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

import { reducerActions } from '../reducers/rootActions';
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

  const withHomeButton = (element: JSX.Element, onClick = actions.goToHome): JSX.Element => (
    <>
      <FontAwesomeIcon
        className="home_main_home-button"
        icon={faArrowCircleLeft}
        onClick={onClick}
      />
      {element}
    </>
  );

  const messageArea = (
    <>
      <ChatPartnerProfile />
      <MessageBoard />
      <MessageEditor />
    </>
  );

  const getMessageAreaContents = (): JSX.Element => {
    switch (appState.currentState) {
      case (appStates.gdpr):
        return withHomeButton(<GDPR />);
      case (appStates.selectAvatar):
        return withHomeButton(<SelectAvatar />);
      default:
        return !client.chatPartner.id
          ? <Welcome />
          : withHomeButton(messageArea, actions.resetChatPartner);
    }
  };

  return (
    <div className="home_main">
      {getMessageAreaContents()}
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(MainArea);
