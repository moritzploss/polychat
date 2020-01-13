import React, { useState, ChangeEvent } from 'react';
import { connect } from 'react-redux';

import { Client } from '../types/client';
import { directMessageParcel } from '../parcels/blueprints';

const MessageEditor = ({ client, session, parcelService }: { client: Client; session: any; parcelService: any; setChatPartner: Function }): JSX.Element => {
  const [message, setMessage] = useState('');

  const updateMessage = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setMessage(event.target.value);
  };

  const sendMessage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
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

const mapStateToProps = ({ client, session, parcelService }: { client: Client; session: any; parcelService: any }): Record<string, Client> => ({
  client,
  session,
  parcelService,
});

export default connect(mapStateToProps)(MessageEditor);
