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
        {/** 챌린지 정보 */}
        <CompoundSharePage.ImageCard
          src={'/images/dog.png'}
          alt={'challenge-info'}
          title={shareData.challengeInfo?.content?.value ?? ''}
          periodText={shareData.getPeriodText()}
          ref={shareData.imageRef}
        />
        {/** 주최자 > 다운로드 */}
        {!!shareData.isMyChallenge && (
          <CompoundSharePage.DownloadButton onClick={shareData.onClickDownload} />
        )}
        {/** 주최자 > 공유하기 */}
        {!!shareData.isMyChallenge && (
          <CompoundSharePage.ShareButton onClick={shareData.onClickShare} />
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
