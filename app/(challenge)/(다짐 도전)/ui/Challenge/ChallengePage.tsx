'use client';

import { ballImages, unknownBallImages } from '@/app/common/constants/ballImage';
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
  const {
    challengeInfo,
    certificateList,
    fixedButtonInfo,
    isMyChallenge,
    challengeStatus,
    onClickCertificate,
    onClickAddNewChallenge,
    onClickUserList,
  } = useHandleChallengePage({ goalId });
  return (
    <>
      <Header
        appendingRightButton={<ButtonIcon onClick={openDrawer} name="menu" fill="white" size="l" />}
      />
      <CompoundChallengePage>
        {/** 상단 라벨 */}
        <CompoundChallengePage.Labels>
          <CompoundChallengePage.Labels.Item {...challengeInfo.label} />
        </CompoundChallengePage.Labels>
        {/** 챌린지 정보 */}
        <CompoundChallengePage.ChallengeInfo
          title={challengeInfo.title}
          periodText={challengeInfo.periodText}
        />
        {/** 미르 이미지 */}
        <CompoundChallengePage.MainImage
          src={'/images/mirr/mirr_Gifticon.png'}
          alt={'challenge-info'}
        />
        {/** 구슬 이미지 */}
        {(!!isMyChallenge || (!isMyChallenge && challengeStatus !== 'PROCEEDING')) && (
          <CompoundChallengePage.BallImages
            images={ballImages}
            certificationList={certificateList}
            onClickCertificate={onClickCertificate}
            onClickAddNewChallenge={onClickAddNewChallenge}
          />
        )}
        {!isMyChallenge && challengeStatus === 'PROCEEDING' && (
          <CompoundChallengePage.BallImages
            images={unknownBallImages}
            certificationList={certificateList}
          />
        )}
        {/** 하단 고정 버튼 */}
        <CompoundChallengePage.NavigateFixedButton
          overButtonText={challengeInfo.participateInfoText}
          onClickOverButton={onClickUserList}
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
