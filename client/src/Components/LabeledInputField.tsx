import React from 'react';

// eslint-disable-next-line object-curly-newline
const LabeledInputField = ({ type, id, name, value, onChange, className }: Record<string, any>): JSX.Element => (
  <div className={className}>
    <label htmlFor={id}>
      {name}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={(event): void => onChange(event)}
    />
  </div>
 
);

export default LabeledInputField;
