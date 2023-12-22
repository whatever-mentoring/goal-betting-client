import navigationPath from '@/app/common/navigation/navigationPath';
import { LabelProps } from '@/app/common/ui/Label/Label';
import { getDayPeriodToText, nthDayFromStartDate } from '@/app/common/util/date';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetChallengeInfoQuery } from '../api/challenge';
import { useGETChallengeParticipantQuery } from '../api/participantList';

dayjs.locale('ko');

export type ButtonInfo = {
  text: string;
  link: string;
};

export interface ChallengeInfo {
  id: number;
  label: LabelProps;
  title: string;
  periodText: string;
  participateInfoText: string;
}

interface HandleChallengePageProps {
  goalId: number;
}

const useHandleChallengePage = ({ goalId }: HandleChallengePageProps) => {
  const router = useRouter();
  // SERVER
  const [challengeInfo, setChallengeInfo] = useState<ChallengeInfo>({
    id: 0,
    label: {
      text: '',
      labelColor: 'grey200',
    },
    title: '',
    periodText: '',
    participateInfoText: '',
  });
  const { data: challengeInfoData } = useGetChallengeInfoQuery({ goalId });

  // 첼린지가 시작하지 않는 경우 공유하기 페이지로 이동
  useEffect(() => {
    if (!challengeInfoData) return;
    if (dayjs(challengeInfoData.data.goal.startDate).isAfter(dayjs())) {
      router.push(navigationPath.다짐_공유_페이지(goalId)),
        {
          scroll: false,
        };
    }
  }, [challengeInfoData]);

  // 1. 챌린지 정보 가져오기
  useEffect(() => {
    if (!challengeInfoData.data) return;

    setChallengeInfo((prev) => ({
      ...prev,
      id: challengeInfoData.data.goal.id,
      label: getLabelInfo(
        challengeInfoData.data.goal.startDate,
        challengeInfoData.data.goal.endDate,
      ),
      title: challengeInfoData.data.goal.content.value,
      periodText: getDayPeriodToText(dayjs(challengeInfoData.data.goal.startDate), 7),
    }));
  }, [challengeInfoData]);

  // 2. 내 챌린지인지 확인
  const [isMyChallenge, setIsMyChallenge] = useState(false);
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (!sessionData || !challengeInfoData) return;
    if (sessionData.user.userId === challengeInfoData.data.goal.hostUserId) {
      setIsMyChallenge(true);
    }
  }, [sessionData, challengeInfoData]);

  // 3. 참가자 정보 가져오기
  const { data: participantsData } = useGETChallengeParticipantQuery({ goalId });

  useEffect(() => {
    if (!participantsData) return;
    if (participantsData.data.participants.length) {
      setChallengeInfo((prev) => ({
        ...prev,
        participateInfoText: `${participantsData.data.participants.length}명이 참여 중`,
      }));
      return;
    }
    setChallengeInfo((prev) => ({
      ...prev,
      participateInfoText: '아직 참여자가 없어요',
    }));
  }, [participantsData]);

  // UI LOGIC
  const [fixedButtonInfo, setFixedButtonInfo] = useState<ButtonInfo>({
    text: '',
    link: navigationPath.홈_페이지,
  });

  useEffect(() => {
    if (!challengeInfoData) return;
    setFixedButtonInfo(
      getButtonInfo(
        isMyChallenge,
        dayjs(challengeInfoData.data.goal.endDate).isBefore(dayjs(), 'day'),
        challengeInfoData.data.goal.startDate,
        challengeInfoData.data.goal.id,
      ),
    );
  }, [challengeInfoData, isMyChallenge]);

  return {
    challengeInfo,
    fixedButtonInfo,
  };
};

export default useHandleChallengePage;

const getLabelInfo = (startDate: Date, endDate: Date): LabelProps => {
  if (dayjs(endDate).isBefore(dayjs(), 'day')) {
    return {
      text: '내기 종료',
      labelColor: 'grey200',
      textColor: 'black',
    };
  }

  if (dayjs(startDate).subtract(1, 'day').isBefore(dayjs(), 'day')) {
    return {
      text: `${nthDayFromStartDate(startDate)}일차`,
      labelColor: 'purple400',
    };
  }

  return {
    text: '내기 종료',
    labelColor: 'grey200',
  };
};

const getButtonInfo = (
  isOrganizer: boolean,
  isChallengeEnded: boolean,
  startDate: Date,
  goalId: number,
): ButtonInfo => {
  if (isOrganizer) {
    return isChallengeEnded
      ? {
          text: '내기 종료',
          link: navigationPath.다짐_결과_퍼널(goalId).도전_결과,
        }
      : {
          text: `${nthDayFromStartDate(startDate)}일차 인증하기`,
          link: navigationPath.다짐_도전_퍼널(goalId).다짐_인증,
        };
  } else {
    return isChallengeEnded
      ? {
          text: '결과 보기',
          link: navigationPath.다짐_결과_퍼널(goalId).도전_결과,
        }
      : {
          text: '나도 내기 만들기',
          link: navigationPath.다짐_생성_퍼널.다짐_입력,
        };
  }
};
