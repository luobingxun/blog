import dayjs from 'dayjs';

export const formmatDatetime = (dateString: string): string => {
  return dayjs(dateString).format('MMM D, YYYY');
};
