import classNames from 'classnames';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useState } from 'react';
import Icon from '../assets/Icon';
import { calendarStyle } from './calendar.css';

dayjs.locale('ko');

type MonthType = 'PREV' | 'CURRENT' | 'NEXT';

interface OneDayMode {
  mode: 'ONE_DAY';
  date: dayjs.Dayjs;
}

interface SeveralDaysMode {
  mode: 'SEVERAL_DAYS';
  startDate: dayjs.Dayjs;
  count: number;
}

interface CalendarProps {
  onChangeDate?: (value: dayjs.Dayjs) => void;
  mode: OneDayMode | SeveralDaysMode;
  disablePast?: boolean;
}

const Calendar = ({ onChangeDate, mode, disablePast = false }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const makeInitialDays = (mode: OneDayMode | SeveralDaysMode): dayjs.Dayjs[] => {
    if (mode.mode === 'ONE_DAY') {
      return [mode.date];
    }
    if (mode.mode === 'SEVERAL_DAYS') {
      const daysArray = makeDaysToArray(mode.startDate, mode.count);
      return daysArray;
    }
    return [];
  };
  const [selectedDays, setSelectedDays] = useState(makeInitialDays(mode));

  const handleDayClick = (day: number, monthType: MonthType) => {
    let newMonth = currentMonth;

    if (monthType === 'PREV') {
      newMonth = currentMonth.subtract(1, 'month');
    } else if (monthType === 'NEXT') {
      newMonth = currentMonth.add(1, 'month');
    }

    setCurrentMonth(newMonth);

    const newSelectedDay = newMonth.set('date', day);

    if (disablePast && newSelectedDay.isBefore(dayjs().add(1, 'day'), 'day')) {
      return;
    }

    if (mode.mode === 'ONE_DAY') {
      setSelectedDays([newSelectedDay]);
    }
    if (mode.mode === 'SEVERAL_DAYS') {
      const daysArray = makeDaysToArray(newSelectedDay, mode.count);
      setSelectedDays(daysArray);
    }

    if (onChangeDate) {
      onChangeDate(newSelectedDay);
    }
  };

  return (
    <div className={calendarStyle.base}>
      <Header currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      <HeaderRow />
      <DayGrid
        currentMonth={currentMonth}
        selectedDays={selectedDays}
        onDayClick={handleDayClick}
      />
    </div>
  );
};

interface HeaderProps {
  currentMonth: dayjs.Dayjs;
  setCurrentMonth: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
}

const Header = ({ currentMonth, setCurrentMonth }: HeaderProps) => {
  return (
    <div className={calendarStyle.header}>
      <button
        onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}
        className={calendarStyle.headerButton}
      >
        <Icon name="arrow-left" fill="grey600" size="s" />
      </button>
      <div>{currentMonth.format('M월')}</div>
      <button
        onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}
        className={calendarStyle.headerButton}
      >
        <Icon name="arrow-right" fill="grey600" size="s" />
      </button>
    </div>
  );
};

const HeaderRow = () => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className={calendarStyle.weekHeader}>
      {daysOfWeek.map((day, index) => (
        <div key={index} className={calendarStyle.weekDay}>
          {day}
        </div>
      ))}
    </div>
  );
};

interface DayGridProps {
  currentMonth: dayjs.Dayjs;
  selectedDays: dayjs.Dayjs[];
  onDayClick: (day: number, monthType: MonthType) => void;
}

const DayGrid = ({ currentMonth, selectedDays, onDayClick }: DayGridProps) => {
  const monthStart = currentMonth.startOf('month');
  const monthEnd = currentMonth.endOf('month');
  const startWeekday = monthStart.day();
  const endDay = monthEnd.date();

  const days = [];
  // 이전 달의 날짜 추가
  for (let i = 0; i < startWeekday; i++) {
    const day = currentMonth.subtract(1, 'month').endOf('month').date() - startWeekday + i + 1;
    days.push(
      <Day
        key={`prev-${day}`}
        day={day}
        monthType="PREV"
        isSelected={selectedDays.some((selectedDay) =>
          selectedDay.isSame(currentMonth.subtract(1, 'month').set('date', day), 'day'),
        )}
        isFirst={getIsFirstDay(currentMonth.subtract(1, 'month').set('date', day), selectedDays)}
        isLast={getIsLastDay(currentMonth.subtract(1, 'month').set('date', day), selectedDays)}
        onDayClick={onDayClick}
      />,
    );
  }
  // 현재 달의 날짜 추가
  for (let i = 1; i <= endDay; i++) {
    days.push(
      <Day
        key={`current-${i}`}
        day={i}
        monthType="CURRENT"
        isSelected={selectedDays.some((selectedDay) =>
          selectedDay.isSame(currentMonth.set('date', i), 'day'),
        )}
        isFirst={getIsFirstDay(currentMonth.set('date', i), selectedDays)}
        isLast={getIsLastDay(currentMonth.set('date', i), selectedDays)}
        onDayClick={onDayClick}
      />,
    );
  }
  // 다음 달의 날짜 추가
  const nextDays = 42 - days.length;
  for (let i = 1; i <= nextDays; i++) {
    days.push(
      <Day
        key={`next-${i}`}
        day={i}
        monthType="NEXT"
        isSelected={selectedDays.some((selectedDay) =>
          selectedDay.isSame(currentMonth.add(1, 'month').set('date', i), 'day'),
        )}
        isFirst={getIsFirstDay(currentMonth.add(1, 'month').set('date', i), selectedDays)}
        isLast={getIsLastDay(currentMonth.add(1, 'month').set('date', i), selectedDays)}
        onDayClick={onDayClick}
      />,
    );
  }

  return <div className={calendarStyle.week}>{days}</div>;
};

interface DayProps {
  day: number;
  monthType: MonthType;
  isSelected: boolean;
  onDayClick: (day: number, monthType: MonthType) => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const Day = ({
  day,
  monthType,
  isSelected,
  onDayClick,
  isFirst = false,
  isLast = false,
}: DayProps) => {
  const dayClass = classNames(calendarStyle.day, {
    [calendarStyle.otherMonthDay]: monthType !== 'CURRENT',
  });

  const dayWrapperClass = classNames(calendarStyle.dayWrapper, {
    [calendarStyle.firstDay]: isFirst,
    [calendarStyle.lastDay]: isLast,
    [calendarStyle.currentDay]: isSelected,
  });

  const getFixedCircleClass = () => {
    if (isFirst) return calendarStyle.fixedFirstCircle;
    if (isLast) return calendarStyle.fixedLastCircle;
    return '';
  };

  const getDateTextClass = () => {
    if (isFirst || isLast) return calendarStyle.blackColorDay;
    if (isSelected) return calendarStyle.dayText;
    if (monthType !== 'CURRENT') return calendarStyle.otherMonthDay;
    return '';
  };

  return (
    <div className={dayWrapperClass} onClick={() => onDayClick(day, monthType)}>
      <div className={getFixedCircleClass()} />
      <div className={dayClass} onClick={() => onDayClick(day, monthType)}>
        <span className={getDateTextClass()}>{day}</span>
      </div>
    </div>
  );
};

export default Calendar;

const makeDaysToArray = (startDate: dayjs.Dayjs, days: number) => {
  const daysArray = [];
  for (let i = 0; i < days; i++) {
    daysArray.push(startDate.add(i, 'day'));
  }
  return daysArray;
};

const getIsFirstDay = (day: dayjs.Dayjs, selectedDays: dayjs.Dayjs[]) => {
  return selectedDays[0].isSame(day, 'day') && selectedDays[0].month() === day.month();
};

const getIsLastDay = (day: dayjs.Dayjs, selectedDays: dayjs.Dayjs[]) => {
  return (
    selectedDays[selectedDays.length - 1].isSame(day, 'day') &&
    selectedDays[selectedDays.length - 1].month() === day.month()
  );
};
