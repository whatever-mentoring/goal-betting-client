import navigationPath from '@/app/common/navigation/navigationPath';
import { useDrawer } from '@/app/common/ui/Drawer/DrawerContext';
import Header from '@/app/common/ui/Header/Header';
import { ButtonIcon } from '@/app/common/ui/assets/Icon';
import { useRouter } from 'next/navigation';
import useHandleChallengePage from '../../module/challenge/useHandleChallengePage';
import { ChallengerFunnelProps } from '../../page';
import CompoundChallengePage from './CompoundChallengePage';

type OmitFunnel = Omit<ChallengerFunnelProps, 'certification' | 'setCertification' | 'onNext'>;
interface ChallengePageProps extends OmitFunnel {
  goalId: number;
}

const ChallengePage = ({ goalId }: ChallengePageProps) => {
  const router = useRouter();
  const { openDrawer } = useDrawer();
  const { challengeInfo, certificateList, fixedButtonInfo, onClickCertificate } =
    useHandleChallengePage({ goalId });
  return (
    <>
      <Header
        appendingRightButton={<ButtonIcon onClick={openDrawer} name="menu" fill="white" size="l" />}
      />
      <CompoundChallengePage>
        <CompoundChallengePage.Labels>
          <CompoundChallengePage.Labels.Item {...challengeInfo.label} />
        </CompoundChallengePage.Labels>
        <CompoundChallengePage.ChallengeInfo
          title={challengeInfo.title}
          periodText={challengeInfo.periodText}
        />
        <CompoundChallengePage.MainImage src={'/images/mirr/stand.png'} alt={'challenge-info'} />
        <CompoundChallengePage.BallImages
          images={images}
          certificationList={certificateList}
          onClickCertificate={onClickCertificate}
          onClickAddNewChallenge={() =>
            router.push(navigationPath.다짐_생성_퍼널.다짐_입력, { scroll: false })
          }
        />
        <CompoundChallengePage.LinkButton
          onClick={() =>
            router.push(navigationPath.유저_목록_페이지(challengeInfo.id), {
              scroll: false,
            })
          }
          buttonText={challengeInfo.participateInfoText}
        />
        <CompoundChallengePage.NavigateFixedButton
          buttonText={fixedButtonInfo.text}
          onClick={() => {
            router.push(fixedButtonInfo.link, { scroll: false });
          }}
        />
      </CompoundChallengePage>
    </>
  );
};

export default ChallengePage;

export interface BallImage {
  onImgSrc: string;
  offImgSrc: string;
  text: string;
  id: number;
}

const images: BallImage[] = [
  {
    onImgSrc: '/images/balls/ball_on_1.png',
    offImgSrc: '/images/balls/ball_off_1.png',
    text: '하루',
    id: 1,
  },
  {
    onImgSrc: '/images/balls/ball_on_2.png',
    offImgSrc: '/images/balls/ball_off_2.png',
    text: '이틀',
    id: 2,
  },
  {
    onImgSrc: '/images/balls/ball_on_3.png',
    offImgSrc: '/images/balls/ball_off_3.png',
    text: '사흘',
    id: 3,
  },
  {
    onImgSrc: '/images/balls/ball_on_4.png',
    offImgSrc: '/images/balls/ball_off_4.png',
    text: '나흘',
    id: 4,
  },
  {
    onImgSrc: '/images/balls/ball_on_5.png',
    offImgSrc: '/images/balls/ball_off_5.png',
    text: '닷새',
    id: 5,
  },
  {
    onImgSrc: '/images/balls/ball_on_6.png',
    offImgSrc: '/images/balls/ball_off_6.png',
    text: '엿새',
    id: 6,
  },
  {
    onImgSrc: '/images/balls/ball_on_7.png',
    offImgSrc: '/images/balls/ball_off_7.png',
    text: '이레',
    id: 7,
  },
] as const;
