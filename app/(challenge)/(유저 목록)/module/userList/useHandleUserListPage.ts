'use client';

import { useGETChallengeParticipantQuery } from '@/app/(challenge)/(다짐 도전)/module/api/participantList';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

interface HandleUserListPageProps {
  goalId: number;
}

export interface User {
  nickName: string;
  profileSrc: string;
  date: dayjs.Dayjs;
  withBorder?: boolean;
}

const useHandleUserListPage = ({ goalId }: HandleUserListPageProps) => {
  const { data } = useGETChallengeParticipantQuery({ goalId });
  const [hostUser, setHostUser] = useState<User>({
    nickName: '',
    profileSrc: '',
    date: dayjs(),
  });
  const [participantList, setParticipantList] = useState<User[]>([]);

  useEffect(() => {
    if (data?.data) {
      const participants = data.data.participants;
      const hostUser = data.data.hostUser;

      setHostUser({
        nickName: hostUser.nickname,
        profileSrc: '/images/mirr/mirr_1.png',
        date: dayjs(hostUser.goalCreatedAt),
      });

      const userList = participants.map((participant) => {
        return {
          nickName: participant.nickname,
          profileSrc: '/images/mirr/mirr_1.png',
          date: dayjs(participant.bettingCreatedAt),
        };
      });

      setParticipantList(userList);
    }
  }, [data]);

  return { hostUser, participantList };
};

export default useHandleUserListPage;
