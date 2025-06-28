import format from 'date-fns/format';
import isValid from 'date-fns/isValid';

export const parseDate = (dateString: string) => {
  const year = dateString.slice(0, 2);
  const month = dateString.slice(2, 4);
  const day = dateString.slice(4, 6);
  const hour = dateString.slice(6, 8);
  const min = dateString.slice(8, 10);
  const parsed = new Date(`20${year}-${month}-${day} ${hour}:${min}`);
  return parsed;
};

export const formatDate = (date: Date) =>
  isValid(date) ? format(date, 'yyyy-MM-dd hh:mm a') : '올바르지 않은 날짜입니다';
