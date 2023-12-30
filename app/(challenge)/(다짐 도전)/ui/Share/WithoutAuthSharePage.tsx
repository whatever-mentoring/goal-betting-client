'use client';
import Header from '@/app/common/ui/Header/Header';
import { ButtonIcon } from '@/app/common/ui/assets/Icon';
import useHandleWithoutAuthSharePage from '../../module/share/useHandleWithoutAuthSharePage';
import CompoundSharePage from './CompoundSharePage';

const WithoutAuthSharePage = ({ params }: { params: { goalId: number } }) => {
  const shareData = useHandleWithoutAuthSharePage({
    goalId: params.goalId,
  });

  return (
    <>
      <Header
        appendingRightButton={
          <ButtonIcon onClick={shareData.openDrawer} name="menu" fill="white" size="l" />
        }
      />
      <CompoundSharePage>
        {/** 상단 라벨 */}
        <CompoundSharePage.Banner>
          <CompoundSharePage.Banner.Item
            text={`D-${shareData.getLeftDays()}`}
            labelColor="cyan500"
          />
          {shareData.challengeInfo?.type === 'BILLING' && (
            <CompoundSharePage.Banner.Item text="기프티콘" labelColor="cyan800" />
          )}
        </CompoundSharePage.Banner>
        {/** 챌린지 정보 */}
        <CompoundSharePage.ImageCard
          src="/images/mirr/mirr_happy.png"
          alt="mirr laugh character"
          title={shareData.challengeInfo?.content?.value ?? ''}
          periodText={shareData.getPeriodText()}
        />
        {/** 참여자 > 참여하기 */}
        <CompoundSharePage.ParticipateButtonWithOverItem {...shareData.participantInfo} />
      </CompoundSharePage>
    </>
  );
};

export default WithoutAuthSharePage;
