import CenterBlank from '@/app/common/ui/Blank/CenterBlank';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import dayjs from 'dayjs';
import UserBox from '../UserBox/UserBox';
import { userListPageStyles } from './userList.css';

interface User {
  nickName: string;
  profileSrc: string;
  date: dayjs.Dayjs;
  withBorder?: boolean;
}

const UserListPage = () => {
  const userList: User[] = [
    {
      nickName: '이것은 샘플 유저',
      profileSrc: '/images/dog.png',
      date: dayjs(),
    },
    {
      nickName: '닉네임',
      profileSrc: '/images/dog.png',
      date: dayjs(),
    },
    {
      nickName: '닉네임',
      profileSrc: '/images/dog.png',
      date: dayjs(),
    },
  ];

  return (
    <>
      <Header showBackButton />
      <div className={userListPageStyles.headerTextWrapper}>
        <Text.TitleH2>유저 목록</Text.TitleH2>
      </div>
      <div className={userListPageStyles.challengerWrapper}>
        <UserBox nickName="닉네임" profileSrc="/images/dog.png" date={dayjs()} withBorder />
      </div>
      <div className={userListPageStyles.userList}>
        {!userList.length && (
          <CenterBlank>
            <Text.BodyS color="grey500">내기에 참여한 사림이 없어요</Text.BodyS>
          </CenterBlank>
        )}
        {!!userList.length &&
          userList.map((user, index) => (
            <UserBox
              key={index}
              nickName={user.nickName}
              profileSrc={user.profileSrc}
              date={user.date}
            />
          ))}
      </div>
    </>
  );
};

export default UserListPage;
