import { ballImages } from '@/app/common/constants/ballImage';
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
          images={ballImages}
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
