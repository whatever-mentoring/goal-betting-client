import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.locale('ko');
dayjs.extend(isSameOrAfter);

/**
 * 주어진 시작 날짜와 기간을 기반으로 기간의 텍스트 표현을 반환합니다.
 *
 * @param {Date} startDate - 기간의 시작 날짜
 * @param {number} day - 기간의 일수
 * @returns {string} 기간을 'YYYY.MM.DD ~ YYYY.MM.DD' 형식의 문자열로 반환
 */
export const getDayPeriodToText = (startDate: Date, day: number): string => {
  const endDate = dayjs(startDate).add(day, 'day');
  return `${dayjs(startDate).format('YYYY.MM.DD')} ~ ${endDate.format('YYYY.MM.DD')}`;
};

/**
 * 시작 날짜로부터 주어진 날짜까지 몇 일째인지 계산합니다.
 *
 * @param {Date} startDate - 시작 날짜
 * @param {Date} [date] - 계산할 날짜 (기본값은 현재 날짜)
 * @returns {number} 시작 날짜로부터의 일수
 */
export const nthDayFromStartDate = (startDate: Date, date?: Date): number => {
  if (!date) return dayjs().startOf('day').diff(dayjs(startDate).startOf('day'), 'day') + 1;
  else return dayjs(date).startOf('day').diff(dayjs(startDate).startOf('day'), 'day') + 1;
};

/**
 * 주어진 날짜를 지정된 형식의 문자열로 변환합니다.
 *
 * @param {Date} date - 변환할 날짜
 * @param {string} format - 날짜 형식 (예: 'YYYY-MM-DD')
 * @returns {string} 변환된 날짜 문자열
 */
export const convertFormatDate = (date: Date, format: string): string => {
  return dayjs(date).format(format);
};

/**
 * 종료 날짜까지 남은 일수를 계산합니다.
 *
 * @param {Date} endDate - 종료 날짜
 * @param {Date} [date] - 시작 날짜 (기본값은 현재 날짜)
 * @returns {number} 남은 일수
 */
export const getLeftDaysFromDate = (endDate: Date, date?: Date): number => {
  if (!date) return dayjs(endDate).startOf('day').diff(dayjs().startOf('day'), 'day');
  else return dayjs(endDate).startOf('day').diff(dayjs(date).startOf('day'), 'day');
};

/**
 * 주어진 날짜가 오늘 이전인지 확인합니다.
 *
 * @param {Date} date - 확인할 날짜
 * @returns {boolean} 주어진 날짜가 오늘 이전이면 true, 그렇지 않으면 false
 */
export const isBeforeToday = (date: Date): boolean => {
  return dayjs(date).startOf('day').isBefore(dayjs().startOf('day'));
};

/**
 * 오늘이 종료 날짜 이후인지 확인합니다.
 *
 * @param {Date} endDate - 종료 날짜
 * @returns {boolean} 오늘이 종료 날짜 이후면 true, 그렇지 않으면 false
 */
export const isTodayIsAfterEndDate = (endDate: Date): boolean => {
  return dayjs().startOf('day').isAfter(dayjs(endDate).startOf('day'));
};

/**
 * 오늘부터 종료 날짜까지 남은 일수를 계산합니다.
 *
 * @param {Date} endDate - 종료 날짜
 * @returns {number} 남은 일수
 */
export const getLeftDaysFromToday = (endDate: Date): number => {
  return dayjs(endDate).startOf('day').diff(dayjs().startOf('day'), 'day') + 1;
};
