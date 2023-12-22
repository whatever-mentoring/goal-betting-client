'use client';
import Header from '@/app/common/ui/Header/Header';
import { ButtonIcon } from '@/app/common/ui/assets/Icon';
import { getDayPeriodToText } from '@/app/common/util/date';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import useHandleSharePage from '../../module/share/useHandleSharePage';
import CompoundSharePage from './CompoundSharePage';

dayjs.locale('ko');

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
        <CompoundSharePage.Banner>
          <CompoundSharePage.Banner.Item
            text={`D-${shareData.getLeftDays()}`}
            labelColor="cyan500"
          />
          {shareData.challengeInfo?.type === 'BILLING' && (
            <CompoundSharePage.Banner.Item text="기프티콘" labelColor="cyan500" />
          )}
        </CompoundSharePage.Banner>
        <CompoundSharePage.ImageCard
          src={'/images/dog.png'}
          alt={'challenge-info'}
          title={shareData.challengeInfo?.content?.value ?? ''}
          periodText={getDayPeriodToText(dayjs(shareData.challengeInfo?.startDate), 7) ?? ''}
          ref={shareData.imageRef}
        />
        {!!shareData.isMyChallenge && (
          <CompoundSharePage.DownloadButton onClick={shareData.onClickDownload} />
        )}
        {!!shareData.isMyChallenge && (
          <CompoundSharePage.ShareButton onClick={shareData.onClickShare} />
        )}
        {!shareData.isMyChallenge && (
          <CompoundSharePage.ParticipateButtonWithOverItem {...shareData.participantInfo} />
        )}
      </CompoundSharePage>
    </>
  );
};

export default SharePage;
