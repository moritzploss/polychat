import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import { ReduxProps } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { reducerActions } from '../reducers/rootActions';
import { UserData } from '../types/applicationWide';

import Contact from './Contact';
import { httpRequest } from '../util/requests';

const isInContactList = (userId: string, contactList: UserData[]): boolean => contactList
  .map((user: UserData) => user.id)
  .includes(userId);

const ContactListWaiting = ({ ownProps, store }: ReduxProps): JSX.Element => {
  const initialWaitingList: UserData[] = [];
  const [waitingList, setWaitingList] = useState(initialWaitingList);

  const waitingForApproval = Object.keys(store.messages)
    .filter((userId) => !isInContactList(userId, store.client.contactList))
    .filter((userId) => userId !== 'test');

  const getUsersByIdAsync = async (userIds: string[]): Promise<UserData[]> => Promise.all(
    userIds.map(async (userId: string): Promise<UserData> => {
      const data = await httpRequest(`/api/users/${userId}`, 'GET');
      return data as UserData;
    }),
  );

  getUsersByIdAsync(waitingForApproval).then((data: UserData[]) => {
    console.log(data);
    // setWaitingList(data);
  });

  return (
    <div className="contacts_waiting">
      <ul className="contacts_waiting_list">
        {waitingList.map((user: UserData) => (
          <Contact
            user={user}
            key={user.id}
            onClick={R.partial(ownProps.clickHandler, [user])}
            className="contacts_waiting_list_item"
          />
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(ContactListWaiting);
