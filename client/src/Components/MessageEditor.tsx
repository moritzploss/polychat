import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { reducerActions } from '../reducers/rootActions';
import { ReactMouseEvent, ReduxProps } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { directMessageParcel } from '../parcels/blueprints';

const MessageEditor = ({ store, actions }: ReduxProps): JSX.Element => {
  const [message, setMessage] = useState('');
  const { client, session, parcelService } = store;

  const sendMessage = (event: ReactMouseEvent): void => {
    event.preventDefault();
    if (message) {
      const parcel = directMessageParcel(
        session.user.id,
        client.chatPartner.id,
        message,
      );
      parcelService.deliver(parcel);
      if (parcel.receiverId !== session.user.id) {
        actions.addOwnDirectMessage(parcel);
      }
      setMessage('');
    }
  };

  return (
    <div className="messageeditor">
      <form className="messageeditor_form" onSubmit={sendMessage}>
        <input
          type="text"
          name="message"
          value={message}
          onChange={({ target }): void => setMessage(target.value)}
          className="messageeditor_form_input"
          placeholder="Say something!"
        />
        <FontAwesomeIcon
          className="messageeditor_form_sendmessage"
          icon={faPaperPlane}
          onClick={sendMessage}
        />
      </form>
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(MessageEditor);
