'use client';

import CenterBlank from '@/app/common/ui/Blank/CenterBlank';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import useHandleUserListPage from '../../module/userList/useHandleUserListPage';
import UserBox from '../UserBox/UserBox';
import { userListPageStyles } from './userList.css';

const UserListInfo = ({ params }: { params: { goalId: number } }) => {
  const { hostUser, participantList } = useHandleUserListPage({ goalId: params.goalId });
  return (
    <>
      <Header showBackButton />
      <div className={userListPageStyles.headerTextWrapper}>
        <Text.TitleH2>유저 목록</Text.TitleH2>
      </div>
      <div className={userListPageStyles.challengerWrapper}>
        <UserBox
          nickName={hostUser.nickName}
          profileSrc={hostUser.profileSrc}
          date={hostUser.date}
          withBorder
        />
      </div>
      {!!params.goalId && (
        <div className={userListPageStyles.userList}>
          {!participantList.length && (
            <CenterBlank>
              <Text.BodyS color="grey500">내기에 참여한 사람이 없어요</Text.BodyS>
            </CenterBlank>
          )}
          {!!participantList.length &&
            participantList.map((user, index) => (
              <UserBox
                key={index}
                nickName={user.nickName}
                profileSrc={user.profileSrc}
                date={user.date}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default UserListInfo;
