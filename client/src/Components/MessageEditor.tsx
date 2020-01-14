import React, { useState } from 'react';
import { connect } from 'react-redux';

import { reducerActions } from '../reducers/rootActions';
import { Store, ReactChangeEvent, ReactMouseEvent, ReduxProps } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { directMessageParcel } from '../parcels/blueprints';

const MessageEditor = ({ store, actions }: ReduxProps): JSX.Element => {
  const [message, setMessage] = useState('');
  const { client, session, parcelService } = store;

  const updateMessage = (event: ReactChangeEvent): void => {
    event.persist();
    setMessage(event.target.value);
  };

  const sendMessage = (event: ReactMouseEvent): void => {
    event.preventDefault();
    const parcel = directMessageParcel(
      session.user.id,
      client.chatPartner,
      message,
    );
    parcelService.deliver(parcel);
    if (parcel.receiverId !== session.user.id) {
      actions.addOwnDirectMessage(parcel);
    }
  };

  return (
    <div className="messageeditor">
      <form className="messageeditor_form">
        <input
          type="text"
          name="message"
          value={message}
          onChange={(event): void => updateMessage(event)}
          className="messageeditor_form_input"
        />
        <button type="submit" onClick={sendMessage}>Send</button>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(MessageEditor);
