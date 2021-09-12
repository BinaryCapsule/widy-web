import moment from 'moment';

export const getNow = () => moment.utc().toISOString();
