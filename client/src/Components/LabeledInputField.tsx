import React from 'react';

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
      onChange={onChange}
    />
  </div>
);

export default LabeledInputField;
