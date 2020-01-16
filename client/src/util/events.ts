const onEnter = (event: React.KeyboardEvent<HTMLInputElement>, callback: Function): void => {
  if (event.key === 'Enter') {
    callback();
  }
};

export { onEnter };
