import React, { useState } from 'react';
import { connect } from 'react-redux';

import { ReduxProps, LanguageInfo } from '../types/client';
import { mapStateToProps, mergeProps } from '../reducers/util';
import { reducerActions } from '../reducers/rootActions';
import { submitUserProfileChange } from '../util/requests';
import { onEnter } from '../util/events';
import { supportedLanguages } from '../languages/supported';

const SettingsUser = ({ store }: ReduxProps): JSX.Element => {
  const { user } = store.session;

  const [newUserName, setNewUserName] = useState(user.name);

  const submitUserNameChange = (): void => {
    submitUserProfileChange(user.id, { name: newUserName });
  };

  const updateLanguage = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    submitUserProfileChange(user.id, { language: event.target.value });
  };

  return (
    <div className="settings_block">
      <h2 className="settings_block_header">Your Profile</h2>
      <div className="settings_block_user">
        <input
          className="settings_block_user_name"
          type="text"
          value={newUserName}
          onBlur={submitUserNameChange}
          onClick={(event: React.ChangeEvent<any>): void => event.target.select()}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setNewUserName(event.target.value)}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>): void => onEnter(event, submitUserNameChange)}
        />
      </div>
      <div className="settings_block_user">
        <select
          className="settings_block_user_language"
          onChange={updateLanguage}
          value={user.language}
        >
          {supportedLanguages.map((lang: LanguageInfo) => (
            <option
              key={lang.code}
              value={lang.code}
            >
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, reducerActions, mergeProps)(SettingsUser);
