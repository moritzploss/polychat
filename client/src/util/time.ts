const formatTimeStamp = (timeStamp: string): string => {
  const messageTime = new Date(timeStamp);
  const messageDate = messageTime.toDateString();
  return (messageDate === new Date().toDateString())
    ? messageTime.toLocaleTimeString('sv-SV')
    : messageDate;
};

export { formatTimeStamp };
