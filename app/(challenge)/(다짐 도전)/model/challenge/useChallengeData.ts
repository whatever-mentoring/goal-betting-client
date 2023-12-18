import { useEffect, useState } from 'react';
import challengeModel, { ButtonInfo } from './challengeModel';

const useChallengeData = () => {
  const [buttonInfo, setButtonInfo] = useState<ButtonInfo>({
    text: '1일차 인증하기',
    link: '다짐_인증',
  });

  useEffect(() => {
    const updateButtonInfo = () => {
      const info = challengeModel.getButtonInfo();
      setButtonInfo(info);
    };

    challengeModel.addEventListener(updateButtonInfo);
    return () => {
      challengeModel.removeEventListener(updateButtonInfo);
    };
  }, []);

  return { buttonInfo };
};

export default useChallengeData;
