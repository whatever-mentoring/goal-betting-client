import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const getDayPeriodToText = (startDate: dayjs.Dayjs, day: number) => {
  const endDate = startDate.add(day, 'day');
  return `${startDate.format('YYYY.MM.DD')} ~ ${endDate.format('YYYY.MM.DD')}`;
};

export const nthDayFromStartDate = (startDate: Date, date?: Date) => {
  if (!date) return dayjs().diff(startDate, 'day') + 1;
  else dayjs(date).diff(startDate, 'day') + 1;
};

export const covertFormatDate = (date: Date, format: string) => {
  return dayjs(date).format(format);
};

export const getLeftDaysFromDate = (endDate: Date, date?: Date) => {
  if (!date) return dayjs(endDate).diff(dayjs(), 'day') + 1;
  else return dayjs(endDate).diff(dayjs(date), 'day') + 1;
};
