import navigationPath from '@/app/common/navigation/navigationPath';
import { LabelProps } from '@/app/common/ui/Label/Label';
import {
  getDayPeriodToText,
  isTodayIsAfterEndDate,
  nthDayFromStartDate,
} from '@/app/common/util/date';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetChallengeInfoWithoutTokenQuery } from '../api/challenge';
import { useGETParticipantListWithoutTokenQuery } from '../api/participantList';

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

export interface CertificateInfo {
  progressDay: number;
  bettingId: number;
}

const useHandleWithoutAuthChallengePage = ({ goalId }: HandleChallengePageProps) => {
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
  const { data: challengeInfoData } = useGetChallengeInfoWithoutTokenQuery({ goalId });

  // 첼린지가 시작하지 않는 경우 공유하기 페이지로 이동
  useEffect(() => {
    if (!challengeInfoData) return;
    if (!isTodayIsAfterEndDate(challengeInfoData.data.startDate)) {
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
      id: challengeInfoData.data.id,
      label: getLabelInfo(
        challengeInfoData.data.startDate,
        challengeInfoData.data.result !== 'PROCEEDING',
      ),
      title: challengeInfoData.data.content.value,
      periodText: getDayPeriodToText(challengeInfoData.data.startDate, 7),
    }));
  }, [challengeInfoData]);

  // 2. 내 챌린지인지 확인
  const isMyChallenge = false;

  // 3. 인증 내역 가져오기
  const onClickCertificate = () => {
    alert('내기에 참여해야 확인할 수 있어요!');
  };

  // 4. 참가자 정보 가져오기
  const { data: participantsData } = useGETParticipantListWithoutTokenQuery({ goalId });

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
        challengeInfoData.data.result !== 'PROCEEDING',
        challengeInfoData.data.startDate,
        challengeInfoData.data.id,
      ),
    );
  }, [challengeInfoData, isMyChallenge]);

  // 새 다짐 클릭
  const onClickAddNewChallenge = () => {
    return;
  };

  // 유저 목록 클릭
  const onClickUserList = () => {
    alert('내기에 참여해야 확인할 수 있어요!');
  };

  return {
    challengeInfo,
    fixedButtonInfo,
    isMyChallenge,
    challengeStatus: challengeInfoData?.data.result,
    onClickCertificate,
    onClickAddNewChallenge,
    onClickUserList,
  };
};

export default useHandleWithoutAuthChallengePage;

const getLabelInfo = (startDate: Date, isChallengeEnded: boolean): LabelProps => {
  if (isChallengeEnded) {
    return {
      text: '내기 종료',
      labelColor: 'grey200',
      textColor: 'black',
    };
  }

  return {
    text: `${nthDayFromStartDate(startDate)}일차`,
    labelColor: 'purple400',
  };
};

const getButtonInfo = (isChallengeEnded: boolean, startDate: Date, goalId: number): ButtonInfo => {
  return isChallengeEnded
    ? {
        text: '결과 보기',
        link: navigationPath.다짐_결과_퍼널(goalId).도전_결과,
      }
    : {
        text: '나도 내기 만들기',
        link: navigationPath.다짐_생성_퍼널.다짐_입력,
      };
};
