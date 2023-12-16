import navigationPath from '@/app/common/navigation/navigationPath';
import Text from '@/app/common/ui/Text/Text';
import Icon, { IconName } from '@/app/common/ui/assets/Icon';
import { Color } from '@/app/common/ui/colors.css';
import Link from 'next/link';
import { challengeCardStyles } from './challengeCard.css';

export interface ChallengeCardProps {
  title: string;
  nickname: string;
  date: string;
  id: number;
  challengeStatus: 'SUCCESS' | 'FAIL' | 'PROGRESS';
}

type IconNameAndColor = {
  name: IconName;
  color: Color;
};

const IconRecord: Record<ChallengeCardProps['challengeStatus'], IconNameAndColor> = {
  SUCCESS: {
    name: 'docs',
    color: 'purple500',
  },
  FAIL: {
    name: 'close-circle',
    color: 'cyan400',
  },

  PROGRESS: {
    name: 'fist',
    color: 'cyan800',
  },
};

const ChallengeCard = ({ title, nickname, date, challengeStatus }: ChallengeCardProps) => {
  return (
    <Link
      href={navigationPath.다짐_도전_퍼널.다짐_도전}
      scroll={false}
      className={challengeCardStyles.wrapper}
    >
      <Left title={title} nickname={nickname} date={date} challengeStatus={challengeStatus} />
      <Right />
    </Link>
  );
};

export default ChallengeCard;

interface LeftProps {
  title: string;
  nickname: string;
  date: string;
  challengeStatus: 'SUCCESS' | 'FAIL' | 'PROGRESS';
}

const Left = ({ title, nickname, date, challengeStatus }: LeftProps) => {
  return (
    <div className={challengeCardStyles.leftWrapper}>
      <div className={challengeCardStyles.iconWrapper}>
        <Icon
          name={IconRecord[challengeStatus].name}
          size="l"
          fill={IconRecord[challengeStatus].color}
        />
      </div>
      <div className={challengeCardStyles.left}>
        <Text.BodyM>{title}</Text.BodyM>
        <Text.BodyS color="grey300">{nickname}</Text.BodyS>
        <Text.BodyS color="grey600">{date}</Text.BodyS>
      </div>
    </div>
  );
};

const Right = () => {
  return (
    <div className={challengeCardStyles.right}>
      <Text.BodyS>더보기</Text.BodyS>
    </div>
  );
};
