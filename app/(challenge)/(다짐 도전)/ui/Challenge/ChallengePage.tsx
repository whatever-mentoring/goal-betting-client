import { ChallengerFunnelProps } from '@/app/(challenge)/(다짐 도전)/page';
import navigationPath from '@/app/common/navigation/navigationPath';
import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import ButtonWrapper from '@/app/common/ui/Button/ButtonWrapper';
import { useDrawer } from '@/app/common/ui/Drawer/DrawerContext';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import { ButtonIcon } from '@/app/common/ui/assets/Icon';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { challengePageStyles } from './challenge.css';

dayjs.locale('ko');

interface ChallengePageProps extends ChallengerFunnelProps {
  buttonText: string;
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

  const get7DayPeriodText = () => {
    const endDate = startDate.add(7, 'day');
    return `${startDate.format('YYYY.MM.DD')} ~ ${endDate.format('YYYY.MM.DD')}`;
  };

  const images = [
    '/images/dog.png',
    '/images/dog.png',
    '/images/dog.png',
    '/images/dog.png',
    '/images/dog.png',
    '/images/dog.png',
    '/images/dog.png',
  ];

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
        <Text.BodyS color="grey400">{get7DayPeriodText()}</Text.BodyS>
      </div>

      <div className={challengePageStyles.fixedBox}></div>

      <div className={challengePageStyles.mainImageWrapper}>
        <div className={challengePageStyles.mainImageBox}>
          <Image
            className={challengePageStyles.image}
            src="/images/dog.png"
            alt="Image description"
            fill
            quality={100}
            priority
          />
        </div>
      </div>

      <div className={challengePageStyles.gridContainer}>
        {images.slice(0, 4).map((image, idx) => (
          <div key={`${image + idx}`} className={challengePageStyles.gridItem}>
            <Image
              className={challengePageStyles.image}
              src={image}
              alt="Image description"
              width={100}
              height={100}
              priority
            />
          </div>
        ))}
      </div>

      <div className={challengePageStyles.gridSecondRow}>
        {images.slice(4).map((image, idx) => (
          <div key={`${image + idx}`} className={challengePageStyles.gridItem}>
            <Image
              className={challengePageStyles.image}
              src={image}
              alt="Image description"
              width={100}
              height={100}
              priority
            />
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
