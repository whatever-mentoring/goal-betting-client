import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import TextArea from '@/app/common/ui/TextArea/TextArea';
import { headerTextWrapper } from '@/app/common/ui/common.css';
import Image from 'next/image';
import { Dispatch, SetStateAction, useLayoutEffect, useState } from 'react';
import { Challenge, ChallengeAddFunnelProps } from '../../add/page';
import { challengeInputPageStyles } from './challengeInput.css';

interface DescriptionPageProps extends ChallengeAddFunnelProps {
  challenge: Challenge;
  setChallenge: Dispatch<SetStateAction<Challenge>>;
}

const randomExample = [
  '매일매일 헬스장 가기 이건 어때?',
  '매일매일 책읽기 이건 어때?',
  '매일매일 물 마시기 이건 어때?',
] as const;

const ChallengeInputPage = ({ challenge, setChallenge, onNext }: DescriptionPageProps) => {
  const isAllFilled = challenge.title.length > 0;

  const [randomElement, setRandomElement] =
    useState<(typeof randomExample)[number]>('매일매일 물 마시기 이건 어때?');

  useLayoutEffect(() => {
    const randomIndex = Math.floor(Math.random() * randomExample.length);
    setRandomElement(randomExample[randomIndex]);
  }, []);

  return (
    <>
      <Header />
      <div className={headerTextWrapper}>
        <Text.TitleH1>어떤 다짐을 할거니?</Text.TitleH1>
      </div>
      <div className={challengeInputPageStyles.inputWrapper}>
        <TextArea>
          <TextArea.Base
            placeholder="다짐한 제목은 변경할 수 없어요!"
            value={challenge.title}
            onChange={(e) => setChallenge((prev) => ({ ...prev, title: e.target.value }))}
            maxRows={3}
            minRows={1}
            rows={1}
            withCount={{
              max: 20,
              initialVisible: true,
            }}
          />
        </TextArea>
      </div>
      <div className={challengeInputPageStyles.boxCanvas}>
        <div className={challengeInputPageStyles.boxWrapper}>
          <div className={challengeInputPageStyles.imageWrapper}>
            <Image
              src="/images/mirr/mirr_Gifticon.png"
              fill
              alt="challenge-info"
              className={challengeInputPageStyles.image}
              sizes="(max-width: 480px) 142px"
              priority
            />
          </div>
          <div className={challengeInputPageStyles.challengeExampleWrapper}>
            <Text.BodyS color="grey400">{randomElement}</Text.BodyS>
          </div>
        </div>
      </div>
      <BottomFixedButton>
        <BottomFixedButton.First
          disabled={!isAllFilled}
          width={100}
          onClick={onNext}
          color="purple500-active"
          type="submit"
        >
          <Text.ButtonL color={isAllFilled ? 'white' : 'grey400'}>다음으로</Text.ButtonL>
        </BottomFixedButton.First>
      </BottomFixedButton>
    </>
  );
};

export default ChallengeInputPage;
