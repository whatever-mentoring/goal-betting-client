'use client';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { AnimatePresence, motion } from 'framer-motion';
import useHandleChallenge from '../../module/useHandleChallenge';
import ChallengeCard, { ChallengeCardProps } from '../ChallengeCard/ChallengeCard';
import { challengesPageStyles, selectButton } from './challenges.css';

dayjs.locale('ko');

type ToggleState = 'left' | 'right';

const StepText: Record<ToggleState, string> = {
  left: '내가 생성한 다짐',
  right: '내가 참여한 다짐',
} as const;

const ChallengeListPage = () => {
  const { toggleState, betList, challengeList, setToggleState } = useHandleChallenge();
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
            <StepComponent headerText={StepText[toggleState]} challenges={challengeList} />
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
            <StepComponent headerText={StepText[toggleState]} challenges={betList} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChallengeListPage;

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
