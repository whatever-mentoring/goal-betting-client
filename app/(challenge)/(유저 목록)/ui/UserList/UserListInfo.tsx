'use client';

import CenterBlank from '@/app/common/ui/Blank/CenterBlank';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import useHandleUserListPage from '../../module/userList/useHandleUserListPage';
import UserBox from '../UserBox/UserBox';
import { userListPageStyles } from './userList.css';

const UserListInfo = ({ params }: { params: { goalId: number } }) => {
  const { userList } = useHandleUserListPage({ goalId: params.goalId });
  return (
    <>
      <Header showBackButton />
      <div className={userListPageStyles.headerTextWrapper}>
        <Text.TitleH2>유저 목록</Text.TitleH2>
      </div>
      <div className={userListPageStyles.challengerWrapper}>
        {userList.length > 0 && (
          <UserBox
            nickName={userList[0].nickName}
            profileSrc={userList[0].profileSrc}
            date={userList[0].date}
            withBorder
          />
        )}
      </div>
      {!!params.goalId && (
        <div className={userListPageStyles.userList}>
          {!userList.length && (
            <CenterBlank>
              <Text.BodyS color="grey500">내기에 참여한 사림이 없어요</Text.BodyS>
            </CenterBlank>
          )}
          {!!userList.length &&
            userList
              .slice(1)
              .map((user, index) => (
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
