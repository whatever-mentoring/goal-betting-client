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

const useHandleResult = ({ setStep }: HandleResultProps) => {
  const { data: sessionData } = useSession();

  const router = useRouter();

  const [steps, setSteps] = useState<Step[] | null>(null);

  useEffect(() => {
    if (!sessionData) return;
    const builderSteps = new ResultStepBuilder({
      nickname: sessionData?.user.nickname || '',
      hasGifticon: true,
      isOwner: true,
      isSuccess: false,
      winnerNickname: '김코딩',
    });
    const actionHandler = builderSteps.build();
    if (!actionHandler) return;
    const stepsFromBuilder = actionHandler.getSteps();
    const transformedStep = stepsFromBuilder.map((step) => {
      return transformStep(step, router, setStep);
    });
    setSteps(transformedStep);
  }, [sessionData]);

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
      button: {
        text: builderStep.buttonText,
        callback: () => {},
      },
    };
  if (builderStep.buttonTo && builderStep.buttonTo.type === 'link') {
    return {
      headerText: builderStep.headerText,
      button: {
        text: builderStep.buttonText,
        callback: () => {
          // callback 함수 내에서도 다시 한 번 확인
          if (builderStep.buttonTo && builderStep.buttonTo.type === 'link') {
            router.push(builderStep.buttonTo.link);
          }
        },
      },
    };
  }
  return {
    headerText: builderStep.headerText,
    button: {
      text: builderStep.buttonText,
      callback: () => {
        // callback 함수 내에서도 다시 한 번 확인
        if (builderStep.buttonTo && builderStep.buttonTo.type === 'funnel') {
          setStep(builderStep.buttonTo.step as T);
        }
      },
    },
  };
};
