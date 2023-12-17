import dayjs from 'dayjs';

export const getDayPeriodToText = (startDate: dayjs.Dayjs, day: number) => {
  const endDate = startDate.add(day, 'day');
  return `${startDate.format('YYYY.MM.DD')} ~ ${endDate.format('YYYY.MM.DD')}`;
};
