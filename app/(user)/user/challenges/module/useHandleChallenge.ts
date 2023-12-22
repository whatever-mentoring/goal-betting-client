import { useGETBetListQuery } from '@/app/(challenge)/(다짐 도전)/module/api/betList';
import { useGetChallengeListQuery } from '@/app/(challenge)/(다짐 도전)/module/api/challengeList';
import navigationPath from '@/app/common/navigation/navigationPath';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ChallengeCardProps } from '../ui/ChallengeCard/ChallengeCard';

dayjs.locale('ko');

type ToggleState = 'left' | 'right';

const useHandleChallenge = () => {
  const [toggleState, setToggleState] = useState<ToggleState>('left');
  const { data: sessionData } = useSession();
  const { data: betListData } = useGETBetListQuery();
  const { data: challengeListData } = useGetChallengeListQuery();

  const [betList, setBetList] = useState<ChallengeCardProps[]>([]);
  const [challengeList, setChallengeList] = useState<ChallengeCardProps[]>([]);

  useEffect(() => {
    if (!betListData) return;
    if (!sessionData) return;
    const betList = betListData.data;
    const challengeList: ChallengeCardProps[] = [];
    betList.forEach((bet) => {
      const isChallengeStarted = dayjs(bet.goal.startDate).isBefore(dayjs(), 'date');
      challengeList.push({
        id: bet.goal.id,
        title: bet.goal.content.value,
        date: dayjs(bet.goal.startDate).format('YYYY-MM-DD'),
        challengeStatus: 'SUCCESS',
        nickname: sessionData.user.nickname,
        href: isChallengeStarted
          ? navigationPath.다짐_페이지(bet.goal.id)
          : navigationPath.다짐_공유_페이지(bet.goal.id),
      });
    });
    setBetList(challengeList);
  }, [sessionData, betListData]);

  useEffect(() => {
    if (!challengeListData) return;
    if (!sessionData) return;
    const challengeList = challengeListData.data;
    const challengeListCard: ChallengeCardProps[] = [];
    challengeList.forEach((challenge) => {
      const isChallengeStarted = dayjs(challenge.startDate).isBefore(dayjs(), 'date');
      challengeListCard.push({
        id: challenge.id,
        title: challenge.content.value,
        date: dayjs(challenge.startDate).format('YYYY-MM-DD'),
        challengeStatus: 'SUCCESS',
        nickname: sessionData.user.nickname,
        href: isChallengeStarted
          ? navigationPath.다짐_페이지(challenge.id)
          : navigationPath.다짐_공유_페이지(challenge.id),
      });
    });
    setChallengeList(challengeListCard);
  }, [sessionData, challengeListData]);

  return { toggleState, betList, challengeList, setBetList, setToggleState };
};

export default useHandleChallenge;
