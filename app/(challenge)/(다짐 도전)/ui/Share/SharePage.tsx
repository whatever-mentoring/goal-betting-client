'use client';
import Header from '@/app/common/ui/Header/Header';
import { ButtonIcon } from '@/app/common/ui/assets/Icon';
import useHandleSharePage from '../../module/share/useHandleSharePage';
import CompoundSharePage from './CompoundSharePage';

const SharePage = ({ params }: { params: { goalId: number } }) => {
  const shareData = useHandleSharePage({
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
        {/** 참여자용 챌린지 헤더 */}
        {!shareData.isMyChallenge && (
          <CompoundSharePage.HeaderText {...shareData.getChallengeTitle(shareData.isParticipant)} />
        )}
        {/** 챌린지 정보 */}
        <CompoundSharePage.ImageCard
          src={'/images/mirr/mirr_happy.png'}
          alt={'mirr laugh character'}
          title={shareData.challengeInfo?.content?.value ?? ''}
          periodText={shareData.getPeriodText()}
          ref={shareData.imageRef}
        />
        {/** 주최자 > 다운로드 */}
        {!!shareData.isMyChallenge && (
          <CompoundSharePage.DownloadButton
            onClick={() => shareData.onClickDownload(shareData.challengeInfo?.content?.value ?? '')}
          />
        )}
        {/** 주최자 > 공유하기 */}
        {!!shareData.isMyChallenge && (
          <CompoundSharePage.ShareButton
            overItemText={shareData.participantInfo.overItemText}
            onClickOverItem={shareData.participantInfo.onClickOverItem}
            onClick={shareData.onClickShare}
          />
        )}
        {/** 참여자 > 참여하기 */}
        {!shareData.isMyChallenge && (
          <CompoundSharePage.ParticipateButtonWithOverItem {...shareData.participantInfo} />
        )}
      </CompoundSharePage>
    </>
  );
};

export default SharePage;
