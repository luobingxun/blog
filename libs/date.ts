import dayjs from 'dayjs';

export const formmatDatetime = (dateString: string): string => dayjs(dateString).format('MMM D, YYYY');
