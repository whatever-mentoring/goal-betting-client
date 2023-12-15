'use client';

import classNames from 'classnames';
import { ReactNode, useEffect, useState } from 'react';
import Button from '../Button/Button';
import Text from '../Text/Text';
import { withPreWrapCenter } from '../common.css';
import { transitionStyles } from './transition.css';

export interface Step {
  headerText: string;
  button: {
    text: string;
    callback: () => void;
  };
}

interface TransitionComponentProps {
  steps: Step[];
  children?: ReactNode;
}

// TODO : 추후 추가될 동적 요소들을 위해 구조 개선 필요

const TransitionComponent = ({ steps, children }: TransitionComponentProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    // 새로운 텍스트가 오른쪽에서 시작하여 가운데로 이동
    const timer = setTimeout(() => {
      setEntering(false);
    }, 500); // 텍스트가 가운데로 오는데 걸리는 시간
    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleNextStep = () => {
    if (currentStep === steps.length - 1) {
      // 마지막 텍스트가 오른쪽으로 나가게 처리
      steps[currentStep].button.callback();
    }
    if (currentStep < steps.length - 1) {
      // 이전 텍스트가 왼쪽으로 나가게 처리
      setEntering(true);
      setCurrentStep(currentStep + 1);
      steps[currentStep].button.callback();
    }
  };

  return (
    <div className={transitionStyles.container}>
      <div
        key={currentStep}
        className={classNames(
          transitionStyles.text,
          entering ? transitionStyles.enterFromRight : transitionStyles.center,
        )}
      >
        <Text.TitleH1 className={withPreWrapCenter} color="white">
          {steps[currentStep].headerText}
        </Text.TitleH1>
      </div>
      <div className={transitionStyles.childrenWrapper}>{children}</div>
      <div
        className={classNames(
          transitionStyles.buttonWrapper,
          entering ? transitionStyles.enterFromRight : transitionStyles.center,
        )}
      >
        <Button onClick={handleNextStep} color="purple500-active">
          <Text.ButtonL>{steps[currentStep].button.text}</Text.ButtonL>
        </Button>
      </div>
    </div>
  );
};

export default TransitionComponent;
