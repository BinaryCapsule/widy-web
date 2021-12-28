import moment from 'moment';

export const ISO_8601_FORMAT = 'YYYY-MM-DD';

/**
 * @param day - In ISO 8601 format
 */
export const isToday = (day: string) => moment(day).isSame(moment().format(ISO_8601_FORMAT), 'day');

export const formatDay = (day: string) =>
  `${moment(day).format('ddd DD')} ${moment(day).format('MMM YYYY')}`;
