import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import ButtonWrapper from '@/app/common/ui/Button/ButtonWrapper';
import Calendar from '@/app/common/ui/Calendar/Calendar';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import Icon from '@/app/common/ui/assets/Icon';
import { fixedButtonOverWrapper, headerTextWrapper } from '@/app/common/ui/common.css';
import { convertFormatDate } from '@/app/common/util/date';
import dayjs from 'dayjs';
import { ChallengeAddFunnelProps } from '../../add/page';
import { startDatePageStyles } from './startDate.css';

interface StartDatePageProps extends ChallengeAddFunnelProps {}

const StartDatePage = ({ challenge, setChallenge, onNext }: StartDatePageProps) => {
  // UI RENDER
  const formattedDate = convertFormatDate(challenge.startDate, 'YYYY.MM.DD일');
  // USER INTERACTION
  // 1. 유저 > 시작 날짜 선택
  const onChangeDate = (date: dayjs.Dayjs) => {
    setChallenge((prev) => ({ ...prev, startDate: date.toDate() }));
  };

  return (
    <>
      <Header showBackButton />
      <div className={headerTextWrapper}>
        <Text.TitleH1>언제부터 할꺼야?</Text.TitleH1>
      </div>
      <div className={startDatePageStyles.calendarInputWrapper}>
        <div className={startDatePageStyles.calendarInput}>
          <Text.BodyL color="white">{formattedDate}</Text.BodyL>
        </div>
        <div className={startDatePageStyles.calendarIcon}>
          <Icon name="calendar" fill="white" size="l" />
        </div>
      </div>
      <div className={startDatePageStyles.calendarWrapper}>
        <Calendar
          onChangeDate={onChangeDate}
          mode={{ mode: 'SEVERAL_DAYS', count: 7, startDate: dayjs().add(1, 'day') }}
          disablePast
        />
      </div>
      <BottomFixedButton>
        <BottomFixedButton.OverItem className={fixedButtonOverWrapper}>
          <ButtonWrapper onClick={onNext}>
            <Text.BodyM color="white">시작일 전까지 내기 참여자를 모을 수 있어!</Text.BodyM>
          </ButtonWrapper>
        </BottomFixedButton.OverItem>
        <BottomFixedButton.First width={100} onClick={onNext}>
          <Text.ButtonL>다음으로</Text.ButtonL>
        </BottomFixedButton.First>
      </BottomFixedButton>
    </>
  );
};

export default StartDatePage;
