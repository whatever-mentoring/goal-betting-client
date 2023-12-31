import { useGetChallengeInfoQuery } from '@/app/(challenge)/(다짐 도전)/module/api/challenge';
import { 다짐_결과_퍼널_Key } from '@/app/common/navigation/navigationPath';
import { Step } from '@/app/common/ui/Animated/TransitionComponent';
import { useSession } from 'next-auth/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BuilderStep, ResultStepBuilder } from './ResultStepBuilder';

interface HandleResultProps {
  setStep: (step: 다짐_결과_퍼널_Key) => void;
  goalId: number;
}

const useHandleResult = ({ goalId, setStep }: HandleResultProps) => {
  const router = useRouter();
  // SERVER
  // 로그인 체크
  const { data: sessionData } = useSession();

  // 챌린지 정보 가져오기
  const { data: challengeInfo } = useGetChallengeInfoQuery({ goalId });

  const [steps, setSteps] = useState<Step[] | null>(null);

  useEffect(() => {
    if (!sessionData) return;
    if (!challengeInfo) return;
  }, [sessionData, challengeInfo]);

  useEffect(() => {
    if (!sessionData) return;
    if (!challengeInfo) return;
    const builderSteps = new ResultStepBuilder({
      nickname: challengeInfo.data.goal.hostUserNickname,
      hasGifticon: challengeInfo.data.goal.type === 'BILLING',
      isOwner: sessionData.user.userId === challengeInfo.data.goal.hostUserId,
      isSuccess: challengeInfo.data.goal.result === 'SUCCESS',
      winnerNickname: challengeInfo.data.winnerNickname || '',
      isWinner: challengeInfo.data.myBetting?.result === 'GET_GIFTICON' ?? false,
    });
    const actionHandler = builderSteps.build();
    if (!actionHandler) return;
    const stepsFromBuilder = actionHandler.getSteps();
    const transformedStep = stepsFromBuilder.map((step) => {
      return transformStep(step, router, setStep);
    });
    setSteps(transformedStep);
  }, [sessionData, challengeInfo]);

  return { steps };
};

export default useHandleResult;

const transformStep = <T>(
  builderStep: BuilderStep,
  router: AppRouterInstance,
  setStep: (step: T) => void,
): Step => {
  if (!builderStep.buttonTo)
    return {
      headerText: builderStep.headerText,
      imageUrl: builderStep.imageUrl,
      button: {
        text: builderStep.buttonText,
        callback: () => {},
      },
    };
  if (builderStep.buttonTo && builderStep.buttonTo.type === 'link') {
    return {
      headerText: builderStep.headerText,
      imageUrl: builderStep.imageUrl,
      button: {
        text: builderStep.buttonText,
        callback: () => {
          if (builderStep.buttonTo && builderStep.buttonTo.type === 'link') {
            router.push(builderStep.buttonTo.link, {
              scroll: false,
            });
          }
        },
      },
    };
  }
  return {
    headerText: builderStep.headerText,
    imageUrl: builderStep.imageUrl,
    button: {
      text: builderStep.buttonText,
      callback: () => {
        if (builderStep.buttonTo && builderStep.buttonTo.type === 'funnel') {
          setStep(builderStep.buttonTo.step as T);
        }
      },
    },
  };
};
