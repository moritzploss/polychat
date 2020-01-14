import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Store, ReactChangeEvent, ReactMouseEvent } from '../types/client';
import { mapStateToProps } from '../reducers/util';
import { directMessageParcel } from '../parcels/blueprints';

const MessageEditor = ({ client, session, parcelService }: Store): JSX.Element => {
  const [message, setMessage] = useState('');

  const updateMessage = (event: ReactChangeEvent): void => {
    event.persist();
    setMessage(event.target.value);
  };

  const sendMessage = (event: ReactMouseEvent): void => {
    event.preventDefault();
    const parcel = directMessageParcel(
      client.chatPartner,
      session.user.id,
      message,
    );
    parcelService.deliver(parcel);
  };

  return (
    <div className="message-editor">
      <h1>
        Message Editor
      </h1>
      <form>
        <input
          type="text"
          name="message"
          value={message}
          onChange={(event): void => updateMessage(event)}
        />
        <button type="submit" onClick={sendMessage}>Send</button>
      </form>
    </div>
  );
};

export default connect(mapStateToProps)(MessageEditor);