import { ChallengerFunnelProps } from '@/app/(challenge)/(다짐 도전)/page';
import navigationPath from '@/app/common/navigation/navigationPath';
import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import ButtonWrapper from '@/app/common/ui/Button/ButtonWrapper';
import { useDrawer } from '@/app/common/ui/Drawer/DrawerContext';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import { ButtonIcon } from '@/app/common/ui/assets/Icon';
import { getDayPeriodToText } from '@/app/common/util/date';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { challengePageStyles } from './challenge.css';

dayjs.locale('ko');

interface ChallengePageProps extends ChallengerFunnelProps {
  buttonText: string;
}

interface BallImage {
  imgSrc: string;
  id: number;
}

const ChallengePage = ({ buttonText, onNext }: ChallengePageProps) => {
  // TODO : 추후 새로고침 여부에 따라 첫 화면으로 넘길 것
  const router = useRouter();
  const title = '한달동안 3kg 감량할거야';
  const startDate = dayjs().subtract(1, 'day');
  const userCount = 23;

  // UI RENDER
  const getAfterDate = () => {
    const diff = dayjs().diff(startDate, 'day');
    return diff;
  };

  const { openDrawer } = useDrawer();

  return (
    <>
      <Header
        appendingRightButton={<ButtonIcon onClick={openDrawer} name="menu" fill="white" size="l" />}
      />
      <div className={challengePageStyles.dateLeftWrapper}>
        <div className={challengePageStyles.dateLeftBox}>
          <Text.ButtonM color="white">{`${getAfterDate()}일차`}</Text.ButtonM>
        </div>
      </div>
      <div className={challengePageStyles.headerTextWrapper}>
        <Text.TitleH2>{title}</Text.TitleH2>
        <Text.BodyS color="grey400">{getDayPeriodToText(startDate, 7)}</Text.BodyS>
      </div>

      <div className={challengePageStyles.fixedBox}></div>

      <div className={challengePageStyles.mainImageWrapper}>
        <div className={challengePageStyles.mainImageBox}>
          <Image
            className={challengePageStyles.image}
            src="/images/dog.png"
            alt="Main Challenge Image"
            fill
            quality={100}
            priority
          />
        </div>
      </div>

      <div className={challengePageStyles.gridContainer}>
        {images.map((image) => (
          <div key={image.id} className={challengePageStyles.gridItem}>
            {image.imgSrc && (
              <Image
                className={challengePageStyles.image}
                src={image.imgSrc}
                alt="Challenge Ball Image"
                width={100}
                height={100}
                priority
              />
            )}
          </div>
        ))}
      </div>

      <div className={challengePageStyles.userCountWrapper}>
        <ButtonWrapper
          onClick={() => router.push(navigationPath.유저_목록_페이지, { scroll: false })}
          className={challengePageStyles.textButtonStyles}
        >
          <Text.BodyS color="grey300">{userCount}명이 내기에 참여했어요</Text.BodyS>
        </ButtonWrapper>
      </div>

      <BottomFixedButton>
        <BottomFixedButton.First onClick={onNext}>
          <Text.ButtonL>{buttonText}</Text.ButtonL>
        </BottomFixedButton.First>
      </BottomFixedButton>
    </>
  );
};

export default ChallengePage;

const images: BallImage[] = [
  {
    imgSrc: '/images/dog.png',
    id: 1,
  },
  {
    imgSrc: '/images/dog.png',
    id: 2,
  },
  {
    imgSrc: '/images/dog.png',
    id: 3,
  },
  {
    imgSrc: '/images/dog.png',
    id: 4,
  },
  {
    imgSrc: '/images/dog.png',
    id: 5,
  },
  {
    imgSrc: '/images/dog.png',
    id: 6,
  },
  {
    imgSrc: '/images/dog.png',
    id: 7,
  },
  {
    imgSrc: '',
    id: 8,
  },
];
