import React from 'react';

// eslint-disable-next-line object-curly-newline
const LabeledInputField = ({ type, id, name, value, onChange }: Record<string, any>): JSX.Element => (
  <label htmlFor={id}>
    {name}
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={(event): void => onChange(event)}
    />
  </label>
);


export default LabeledInputField;
