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
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    if (data?.data) {
      const participants = data.data.participants;
      const hostUser = data.data.hostUser;

      const userList: User[] = [];

      userList.push({
        nickName: hostUser.nickname,
        profileSrc: '/images/dog.png',
        date: dayjs(hostUser.goalCreatedAt),
        withBorder: true,
      });

      participants.forEach((participant) => {
        userList.push({
          nickName: participant.nickname,
          profileSrc: '/images/dog.png',
          date: dayjs(),
        });
      });

      setUserList(userList);
    }
  }, [data]);

  return { userList };
};

export default useHandleUserListPage;
