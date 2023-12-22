import Text from '@/app/common/ui/Text/Text';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Image from 'next/image';
import { userBoxStyles } from './useBox.css';

interface UserBoxProps {
  nickName: string;
  profileSrc: string;
  date: dayjs.Dayjs;
  withBorder?: boolean;
}

const UserBox = ({ nickName, profileSrc, date, withBorder = false }: UserBoxProps) => {
  return (
    <div className={classNames(userBoxStyles.base, withBorder && userBoxStyles.witheBorder)}>
      <Left profileSrc={profileSrc} />
      <Middle nickName={nickName} date={date} isOwner={withBorder} />
      {/* <Right /> */}
    </div>
  );
};

export default UserBox;

interface LeftProps {
  profileSrc: string;
}

const Left = ({ profileSrc }: LeftProps) => {
  return (
    <div className={userBoxStyles.userWrapper}>
      <Image
        src={profileSrc}
        width={100}
        height={100}
        alt="challenge-info"
        className={userBoxStyles.userImage}
      />
    </div>
  );
};

interface MiddleProps {
  nickName: string;
  date: dayjs.Dayjs;
  isOwner?: boolean;
}

const Middle = ({ nickName, isOwner = false, date }: MiddleProps) => {
  return (
    <div className={userBoxStyles.middleWrapper}>
      <Text.BodyM>{nickName}</Text.BodyM>
      <Text.BodyS color="grey300">{isOwner ? '주최자' : '참여자'}</Text.BodyS>
      <Text.BodyS color="grey600">{dayjs(date).format('MM월 DD일 HH:mm:ss')}</Text.BodyS>
    </div>
  );
};

// NOTE : 현재 유저 상세 페이지가 없어서 주석 처리
// const Right = () => {
//   return (
//     <div className={userBoxStyles.rightWrapper}>
//       <Text.ButtonM>더보기</Text.ButtonM>
//     </div>
//   );
// };
