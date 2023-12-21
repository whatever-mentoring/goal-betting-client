import dayjs from 'dayjs';

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
