'use client';

import navigationPath from '@/app/common/navigation/navigationPath';
import { useDrawer } from '@/app/common/ui/Drawer/DrawerContext';
import {
  getDayPeriodToText,
  getLeftDaysFromDate,
  isTodayIsAfterEndDate,
} from '@/app/common/util/date';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ParticipateButtonProps } from '../../ui/Share/CompoundSharePage';
import { ChallengeDataWithoutAuth, useGetChallengeInfoWithoutTokenQuery } from '../api/challenge';

interface HandleSharePageProps {
  goalId: number;
}

const useHandleWithoutAuthSharePage = ({ goalId }: HandleSharePageProps) => {
  const router = useRouter();
  // SERVER
  const [challengeInfo, setChallengeInfo] = useState<ChallengeDataWithoutAuth | null>(null);
  const { data: challengeInfoData } = useGetChallengeInfoWithoutTokenQuery({
    goalId,
  });

  // 1. 챌린지 정보 가져오기
  useEffect(() => {
    if (!challengeInfoData) return;
    if (isTodayIsAfterEndDate(challengeInfoData.data.startDate)) {
      router.push(navigationPath.다짐_페이지(goalId), {
        scroll: false,
      });
      return;
    }
    if (challengeInfoData.data) {
      setChallengeInfo(challengeInfoData.data);
    }
  }, [challengeInfoData]);

  // 3. 참가자 정보 가져오기
  // TODO : 서버에서 인증 정보 없어진 API 생기면 추가
  const [participantInfo, setParticipantInfo] = useState<ParticipateButtonProps>({
    overItemText: '',
    buttonText: '',
    onClick: () => {},
    onClickOverItem: () => {},
  });

  useEffect(() => {
    setParticipantInfo({
      overItemText: `여러명이 참여중`,
      buttonText: '참여하기',
      onClickOverItem: onClickParticipateList,
      onClick: onClickParticipate,
    });
  }, [challengeInfo]);

  // 4. 참가하기
  const onClickParticipateList = () => {
    router.push(navigationPath.유저_목록_페이지(goalId), {
      scroll: false,
    });
  };

  const onClickParticipate = async () => {
    try {
      await signIn('kakao', {
        redirect: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  // UI LOGIC
  const getLeftDays = () => {
    if (!challengeInfo) return 0;
    return getLeftDaysFromDate(challengeInfo.startDate);
  };

  const getPeriodText = () => {
    if (!challengeInfo) return '';
    return getDayPeriodToText(challengeInfo.startDate, 7);
  };

  // USER INTERACTION
  // 모든 유저 > 상단 헤더 메뉴 클릭
  const { openDrawer } = useDrawer();

  return {
    challengeInfo,
    participantInfo,
    getLeftDays,
    getPeriodText,
    openDrawer,
  };
};

export default useHandleWithoutAuthSharePage;
