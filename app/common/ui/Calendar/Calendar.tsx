import classNames from 'classnames';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useState } from 'react';
import Icon from '../assets/Icon';
import { calendarStyle } from './calendar.css';

dayjs.locale('ko');

type MonthType = 'PREV' | 'CURRENT' | 'NEXT';

interface CalendarProps {
  onChangeDate?: (value: dayjs.Dayjs) => void;
}

const Calendar = ({ onChangeDate }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState(dayjs());

  const handleDayClick = (day: number, monthType: MonthType) => {
    let newMonth = currentMonth;

    if (monthType === 'PREV') {
      newMonth = currentMonth.subtract(1, 'month');
    } else if (monthType === 'NEXT') {
      newMonth = currentMonth.add(1, 'month');
    }

    const newSelectedDay = newMonth.set('date', day);
    setSelectedDay(newSelectedDay);
    setCurrentMonth(newMonth);

    if (onChangeDate) {
      onChangeDate(newSelectedDay);
    }
  };

  return (
    <div className={calendarStyle.base}>
      <Header currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      <HeaderRow />
      <DayGrid currentMonth={currentMonth} selectedDay={selectedDay} onDayClick={handleDayClick} />
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
  selectedDay: dayjs.Dayjs;
  onDayClick: (day: number, monthType: MonthType) => void;
}

const DayGrid = ({ currentMonth, selectedDay, onDayClick }: DayGridProps) => {
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
        isSelected={selectedDay.isSame(currentMonth.subtract(1, 'month').set('date', day), 'day')}
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
        isSelected={selectedDay.isSame(currentMonth.set('date', i), 'day')}
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
        isSelected={selectedDay.isSame(currentMonth.add(1, 'month').set('date', i), 'day')}
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
}

const Day = ({ day, monthType, isSelected, onDayClick }: DayProps) => {
  const dayClass = classNames(calendarStyle.day, {
    [calendarStyle.currentDay]: isSelected,
    [calendarStyle.otherMonthDay]: monthType !== 'CURRENT',
  });

  return (
    <div className={calendarStyle.dayWrapper} onClick={() => onDayClick(day, monthType)}>
      <div className={dayClass} onClick={() => onDayClick(day, monthType)}>
        {day}
      </div>
    </div>
  );
};

export default Calendar;
