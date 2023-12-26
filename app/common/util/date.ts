import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.locale('ko');
dayjs.extend(isSameOrAfter);

export const getDayPeriodToText = (startDate: Date, day: number) => {
  const endDate = dayjs(startDate).add(day, 'day');
  return `${dayjs(startDate).format('YYYY.MM.DD')} ~ ${endDate.format('YYYY.MM.DD')}`;
};

export const nthDayFromStartDate = (startDate: Date, date?: Date) => {
  if (!date) return dayjs().diff(startDate, 'day') + 1;
  else dayjs(date).diff(startDate, 'day') + 1;
};

export const convertFormatDate = (date: Date, format: string) => {
  return dayjs(date).format(format);
};

export const getLeftDaysFromDate = (endDate: Date, date?: Date) => {
  if (!date) return dayjs(endDate).diff(dayjs(), 'day') + 1;
  else return dayjs(endDate).diff(dayjs(date), 'day') + 1;
};

export const isBeforeToday = (date: Date) => {
  return dayjs(date).isBefore(dayjs(), 'day');
};

export const isTodayIsAfterEndDate = (endDate: Date) => {
  return dayjs().add(1, 'day').isAfter(dayjs(endDate), 'day');
};

export const getLeftDaysFromToday = (endDate: Date) => {
  return dayjs(endDate).diff(dayjs(), 'day') + 1;
};
