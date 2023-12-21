'use client';

import useCaptureAndDownloadImage from '@/app/common/hooks/useCaptureAndDownloadImage';
import useTriggerShare from '@/app/common/hooks/useTriggerShare';
import navigationPath from '@/app/common/navigation/navigationPath';
import { useDrawer } from '@/app/common/ui/Drawer/DrawerContext';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ParticipateButtonProps } from '../../ui/Share/CompoundSharePage';
import { useGetChallengeInfoQuery } from '../api/challenge';
import { ChallengeData } from '../api/challengeList';
import { useGETChallengeParticipantQuery } from '../api/participantList';
import { usePOSTParticipateChallengeMutation } from '../api/participate';

interface HandleSharePageProps {
  goalId: number;
}

const useHandleSharePage = ({ goalId }: HandleSharePageProps) => {
  const router = useRouter();
  // SERVER
  const [challengeInfo, setChallengeInfo] = useState<ChallengeData | null>(null);
  const { data: challengeInfoData } = useGetChallengeInfoQuery({ goalId });

  // 1. 챌린지 정보 가져오기
  useEffect(() => {
    if (!challengeInfoData) return;
    if (dayjs(challengeInfoData.data.startDate).isBefore(dayjs())) {
      router.push(navigationPath.홈_페이지),
        {
          scroll: false,
        };
      return;
    }
    if (challengeInfoData.data) {
      setChallengeInfo(challengeInfoData.data);
    }
  }, [challengeInfoData]);

  // 2. 내 챌린지인지 확인
  const [isMyChallenge, setIsMyChallenge] = useState(false);
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (!sessionData || !challengeInfo) return;
    if (sessionData.user.userId === challengeInfo.hostUserId) {
      setIsMyChallenge(true);
    }
  }, [sessionData, challengeInfo]);

  // 3. 참가자 정보 가져오기
  const { data: participantsData } = useGETChallengeParticipantQuery({ goalId });

  const [participantInfo, setParticipantInfo] = useState<ParticipateButtonProps>({
    overItemText: '',
    buttonText: '',
    onClick: () => {},
    onClickOverItem: () => {},
  });

  const { mutate: postParticipate } = usePOSTParticipateChallengeMutation({
    onSuccess: () => {
      setParticipantInfo({
        overItemText: `내기 참여 취소하기`,
        buttonText: '나도 내기 만들기',
        onClick: () =>
          router.push(navigationPath.다짐_생성_퍼널.다짐_입력, {
            scroll: false,
          }),
        onClickOverItem: () => {},
      });
    },
  });

  const onClickParticipate = () => {
    postParticipate({ postData: { goalId, predictionType: 'FAIL' } });
  };

  useEffect(() => {
    if (!participantsData) return;
    if (!sessionData) return;
    const participants = participantsData.data.participants;

    const isParticipant = participants.some((participant) => {
      return participant.userId === Number(sessionData.user.userId);
    });

    if (!isParticipant) {
      setParticipantInfo({
        overItemText: `여러명이 내기에 참여했어요`,
        buttonText: '내기 참여하기',
        onClick: () => onClickParticipate(),
        onClickOverItem: () =>
          router.push(navigationPath.유저_목록_페이지(goalId), {
            scroll: false,
          }),
      });
    } else {
      setParticipantInfo({
        overItemText: `내기 참여 취소하기`,
        buttonText: '나도 내기 만들기',
        onClick: () =>
          router.push(navigationPath.다짐_생성_퍼널.다짐_입력, {
            scroll: false,
          }),
        onClickOverItem: () => {},
      });
    }
  }, [sessionData, participantsData]);

  // UI LOGIC
  const getLeftDays = () => {
    if (!challengeInfo) return 0;
    const today = dayjs();
    return dayjs(challengeInfo.startDate).diff(today, 'day');
  };

  // USER INTERACTION
  // 모든 유저 > 상단 헤더 메뉴 클릭
  const { openDrawer } = useDrawer();

  // 주최자 > 이미지 다운로드
  const imageRef = useRef<HTMLDivElement>(null);
  const { captureAndDownload } = useCaptureAndDownloadImage(imageRef);

  const onClickDownload = () => {
    captureAndDownload('다짐을 인증해줘!');
  };

  // 주최자 > 공유하기
  const { triggerShare } = useTriggerShare();

  const onClickShare = () => {
    if (!challengeInfo) return;
    triggerShare({
      title: challengeInfo.content.value,
      text: challengeInfo.content.value,
      url: location.href,
    });
  };

  return {
    isMyChallenge,
    challengeInfo,
    imageRef,
    participantInfo,
    getLeftDays,
    openDrawer,
    onClickDownload,
    onClickShare,
  };
};

export default useHandleSharePage;
