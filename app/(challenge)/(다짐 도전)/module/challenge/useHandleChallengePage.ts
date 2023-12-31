import navigationPath from '@/app/common/navigation/navigationPath';
import { LabelProps } from '@/app/common/ui/Label/Label';
import {
  getDayPeriodToText,
  getKoreanCurrentTime,
  isTodayIsAfterEndDate,
  nthDayFromStartDate,
} from '@/app/common/util/date';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGETCertificateListQuery } from '../api/certificateList';
import { useGetChallengeInfoQuery } from '../api/challenge';
import { useGETChallengeParticipantQuery } from '../api/participantList';

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
    if (!isTodayIsAfterEndDate(challengeInfoData.data.goal.startDate)) {
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
        challengeInfoData.data.goal.result !== 'PROCEEDING',
      ),
      title: challengeInfoData.data.goal.content.value,
      periodText: getDayPeriodToText(challengeInfoData.data.goal.startDate, 7),
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

  // 3. 인증 내역 가져오기
  const [certificateList, setCertificateList] = useState<CertificateInfo[]>([]);
  const { data: certificateListData } = useGETCertificateListQuery({ goalId });
  const [todayCertificate, setTodayCertificate] = useState(false);

  useEffect(() => {
    if (!sessionData) return;
    if (!certificateListData) return;
    certificateListData.data.goalProofs.forEach((proof) => {
      setCertificateList((prev) => [
        ...prev,
        {
          progressDay: proof.progressDay,
          bettingId: proof.id,
        },
      ]);
    });
    setCertificateList((prev) => prev.sort((a, b) => a.progressDay - b.progressDay));
  }, [sessionData, certificateListData]);

  useEffect(() => {
    if (!certificateList) return;
    if (!challengeInfoData) return;
    const todayCertificate = certificateList.find(
      (certificate) => certificate.progressDay === nthDayFromStartDate(getKoreanCurrentTime()),
    );
    if (todayCertificate) {
      setTodayCertificate(true);
    }
  }, [certificateList, challengeInfoData]);

  const onClickCertificate = (bettingId: number) => {
    router.push(navigationPath.다짐_인증_확인_페이지(goalId)(bettingId)),
      {
        scroll: false,
      };
  };

  // 4. 참가자 정보 가져오기
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
        challengeInfoData.data.goal.result !== 'PROCEEDING',
        todayCertificate,
        challengeInfoData.data.goal.startDate,
        challengeInfoData.data.goal.id,
      ),
    );
  }, [challengeInfoData, isMyChallenge, todayCertificate]);

  // 새 다짐 클릭
  const onClickAddNewChallenge = () => {
    if (!sessionData) return;
    if (challengeInfoData.data.goal.result === 'PROCEEDING') return;
    router.push(navigationPath.다짐_생성_퍼널.다짐_입력, {
      scroll: false,
    });
  };

  // 유저 목록 클릭
  const onClickUserList = () => {
    router.push(navigationPath.유저_목록_페이지(challengeInfo.id), {
      scroll: false,
    });
  };

  return {
    challengeInfo,
    certificateList,
    fixedButtonInfo,
    isMyChallenge,
    challengeStatus: challengeInfoData?.data.goal.result,
    onClickCertificate,
    onClickAddNewChallenge,
    onClickUserList,
  };
};

export default useHandleChallengePage;

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

const getButtonInfo = (
  isOrganizer: boolean,
  isChallengeEnded: boolean,
  isTodayChallenge: boolean,
  startDate: Date,
  goalId: number,
): ButtonInfo => {
  if (isOrganizer) {
    if (isChallengeEnded) {
      return {
        text: '결과 보기',
        link: navigationPath.다짐_결과_퍼널(goalId).도전_결과,
      };
    } else {
      if (isTodayChallenge) {
        return {
          text: '인증 확인하기',
          link: navigationPath.다짐_인증_확인_페이지(goalId)(0),
        };
      } else {
        return {
          text: `${nthDayFromStartDate(startDate)}일차 인증하기`,
          link: navigationPath.다짐_도전_퍼널(goalId).다짐_인증,
        };
      }
    }
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
