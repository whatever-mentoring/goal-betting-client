import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import TextArea from '@/app/common/ui/TextArea/TextArea';
import { headerTextWrapper } from '@/app/common/ui/common.css';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { Challenge, ChallengeAddFunnelProps } from '../../add/page';
import { challengeInputPageStyles } from './challengeInput.css';

interface DescriptionPageProps extends ChallengeAddFunnelProps {
  challenge: Challenge;
  setChallenge: Dispatch<SetStateAction<Challenge>>;
}

const ChallengeInputPage = ({ challenge, setChallenge, onNext }: DescriptionPageProps) => {
  const isAllFilled = challenge.title.length > 0;
  return (
    <>
      <Header showBackButton />
      <div className={headerTextWrapper}>
        <Text.TitleH1>어떤 다짐을 할거니?</Text.TitleH1>
      </div>
      <div className={challengeInputPageStyles.inputWrapper}>
        <TextArea>
          <TextArea.Base
            placeholder="다짐한 제목은 변경할 수 없어요!"
            value={challenge.title}
            onChange={(e) => setChallenge((prev) => ({ ...prev, title: e.target.value }))}
            maxLine={3}
            withCount={{
              max: 20,
              initialVisible: true,
            }}
          />
        </TextArea>
      </div>
      <div className={challengeInputPageStyles.imageWrapper}>
        <Image
          className={challengeInputPageStyles.image}
          src="/images/dog.png"
          fill
          alt="challenge_add"
          priority
        />
      </div>
      <BottomFixedButton>
        <BottomFixedButton.First
          disabled={!isAllFilled}
          width={100}
          onClick={onNext}
          color="purple500-active"
        >
          <Text.ButtonL color={isAllFilled ? 'white' : 'grey400'}>다음으로</Text.ButtonL>
        </BottomFixedButton.First>
      </BottomFixedButton>
    </>
  );
};

export default ChallengeInputPage;
