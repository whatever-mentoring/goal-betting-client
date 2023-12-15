import navigationPath, { 다짐_결과_퍼널_Key } from '@/app/common/navigation/navigationPath';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface HandleResultProps {
  setStep: (step: 다짐_결과_퍼널_Key) => void;
}

export type Challenger = {
  type: 'challenger';
  isSuccess: boolean;
};

export type Participant = {
  type: 'participant';
  isSuccess: boolean;
  isWinner: boolean;
  gifiticonLink?: string;
};

export interface Result {
  user: Challenger | Participant;
}

interface Step {
  headerText: string;
  button: {
    text: string;
    callback: () => void;
  };
}

const sampleParticipant: Participant = {
  type: 'participant',
  isSuccess: false,
  isWinner: true,
};

// const sampleChallenger: Challenger = {
//   type: 'challenger',
//   isSuccess: true,
// };

const useHandleResult = ({ setStep }: HandleResultProps) => {
  const router = useRouter();

  const [result] = useState<Result>({
    user: sampleParticipant,
  });

  const generateTransitionStep = (user: Result['user'], nickname: string) => {
    const steps: Step[] = [];

    if (user.type === 'challenger' && user.isSuccess) {
      steps.push({
        headerText: '내기에 이겼어요',
        button: {
          text: '기프티콘 회수하기',
          callback: () => setStep('도전_결과_저장'),
        },
      });
    }
    if (user.type === 'challenger' && !user.isSuccess) {
      steps.push(
        {
          headerText: '내기에 졌어요',
          button: {
            text: '기프티콘 룰렛 돌리기',
            callback: () => {},
          },
        },
        {
          headerText: `${nickname}님이\n당첨되었어요`,
          button: {
            text: '다음으로',
            callback: () => setStep('도전_결과_저장'),
          },
        },
      );
    }
    if (user.type === 'participant' && user.isSuccess) {
      steps.push({
        headerText: `${nickname}님이\n다짐을 성공했어요!`,
        button: {
          text: '나도 내기 만들기',
          callback: () => router.push(navigationPath.다짐_생성_퍼널.다짐_입력),
        },
      });
    }
    if (user.type === 'participant' && !user.isSuccess && !user.isWinner) {
      steps.push(
        {
          headerText: `${nickname}님이\n다짐을 실패했어요`,
          button: {
            text: '기프티콘 룰렛 돌리기',
            callback: () => {},
          },
        },
        {
          headerText: `${nickname}님이\n당첨되었어요`,
          button: {
            text: '나도 내기 만들기',
            callback: () => router.push(navigationPath.다짐_생성_퍼널.다짐_입력),
          },
        },
      );
    }
    if (user.type === 'participant' && !user.isSuccess && user.isWinner) {
      steps.push(
        {
          headerText: `${nickname}님이\n다짐을 실패했어요`,
          button: {
            text: '기프티콘 룰렛 돌리기',
            callback: () => {},
          },
        },
        {
          headerText: `${nickname}님이\n당첨되었어요`,
          button: {
            text: '기프티콘 당첨!',
            callback: () => setStep('도전_기프티콘'),
          },
        },
      );
    }

    return steps;
  };

  return { result, steps: generateTransitionStep(result.user, '장동현') };
};

export default useHandleResult;
