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
      <Middle nickName={nickName} date={date} />
      <Right />
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
}

const Middle = ({ nickName, date }: MiddleProps) => {
  return (
    <div className={userBoxStyles.middleWrapper}>
      <Text.BodyM>{nickName}</Text.BodyM>
      <Text.BodyS color="grey300">참여자</Text.BodyS>
      <Text.BodyS color="grey600">{dayjs(date).format('MM월 DD일 HH:mm:ss')}</Text.BodyS>
    </div>
  );
};

const Right = () => {
  return (
    <div className={userBoxStyles.rightWrapper}>
      <Text.ButtonM>더보기</Text.ButtonM>
    </div>
  );
};
