import moment from 'moment';

// *Email Regex
export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// *Time Format
export const getFormattedTime = date => {
  const newTime = moment(date).format('hh:mm A');
  return newTime;
};

export const getFormattedDate = timestamp => {
  const formattedDate = moment(timestamp).format('DD/MM/YYYY');
  return formattedDate;
};

export const cnicRegex = /^[0-9+]{5}[0-9+]{7}[0-9]{1}$/;

export const getTimezoneOffset = () => Math.abs(new Date().getTimezoneOffset());
