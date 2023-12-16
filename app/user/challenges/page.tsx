'use client';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { challengesPageStyles, selectButton } from './challenges.css';
import ChallengeCard, { ChallengeCardProps } from './ui/ChallengeCard/ChallengeCard';

dayjs.locale('ko');

type ToggleState = 'left' | 'right';

const StepText: Record<ToggleState, string> = {
  left: '내가 생성한 다짐',
  right: '내가 참여한 다짐',
} as const;

const ChallengesPage = () => {
  const [toggleState, setToggleState] = useState<ToggleState>('left');

  const myChallenges: ChallengeCardProps[] = [
    {
      id: 1,
      title: '일주일 동안 매일 10분씩 운동하기',
      date: dayjs().format('MM월 DD일 HH:mm:ss'),
      nickname: '장동현',
      challengeStatus: 'SUCCESS',
    },
  ] as const;

  const otherChallenges: ChallengeCardProps[] = [
    {
      id: 3,
      title: '일주일 동안 매일 10분씩 운동하기',
      date: dayjs().format('MM월 DD일 HH:mm:ss'),
      nickname: '장동현',
      challengeStatus: 'FAIL',
    },
    {
      id: 4,
      title: '아티클 10개 읽기',
      date: dayjs().format('MM월 DD일 HH:mm:ss'),
      nickname: '김민수',
      challengeStatus: 'PROGRESS',
    },
  ] as const;

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header showBackButton />
      <ToggleButton toggleState={toggleState} setToggleState={setToggleState} />
      <AnimatePresence>
        {toggleState === 'left' && (
          <motion.div
            key="left"
            initial={{ opacity: 0.5, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0.5, x: '-100%' }}
            transition={{ ease: 'easeInOut', duration: 0.3 }}
            className={challengesPageStyles.indicator}
          >
            <StepComponent headerText={StepText[toggleState]} challenges={myChallenges} />
          </motion.div>
        )}
        {toggleState === 'right' && (
          <motion.div
            key="right"
            initial={{ opacity: 0.5, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0.5, x: '-100%' }}
            transition={{ ease: 'easeInOut', duration: 0.3 }}
            className={challengesPageStyles.indicator}
          >
            <StepComponent headerText={StepText[toggleState]} challenges={otherChallenges} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChallengesPage;

interface ToggleButtonProps {
  toggleState: ToggleState;
  setToggleState: (toggleState: ToggleState) => void;
}

const ToggleButton = ({ toggleState, setToggleState }: ToggleButtonProps) => {
  return (
    <div className={challengesPageStyles.topButtonWrapper}>
      <div>
        <input
          type="radio"
          id="left"
          name="toggle"
          value="left"
          checked={toggleState === 'left'}
          onChange={() => setToggleState('left')}
          className={challengesPageStyles.selectButton}
        />
        <label
          htmlFor="left"
          className={selectButton({
            mode: toggleState === 'left' ? 'active' : 'inactive',
          })}
        >
          내 다짐
        </label>

        <input
          type="radio"
          id="right"
          name="toggle"
          value="right"
          checked={toggleState === 'right'}
          onChange={() => setToggleState('right')}
          className={challengesPageStyles.selectButton}
        />
        <label
          htmlFor="right"
          className={selectButton({
            mode: toggleState === 'right' ? 'active' : 'inactive',
          })}
        >
          참여한 다짐
        </label>
      </div>
    </div>
  );
};

interface StepComponentProps {
  headerText: string;
  challenges: ChallengeCardProps[];
}

const StepComponent = ({ headerText, challenges }: StepComponentProps) => {
  return (
    <div className={challengesPageStyles.stepWrapper}>
      <div className={challengesPageStyles.stepHeaderWrapper}>
        <Text.TitleH2>{headerText}</Text.TitleH2>
        <Text.BodyM color="grey500">{challenges.length}개</Text.BodyM>
      </div>
      <div className={challengesPageStyles.stepItemWrapper}>
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} {...challenge} />
        ))}
      </div>
    </div>
  );
};
