import { NonEmptyArray } from '@/app/common/hooks/funnel/models';
import { 다짐_도전_퍼널_Key } from '@/app/common/navigation/navigationPath';
import { Session } from 'next-auth';

type Listener = () => void;

type ChallengeData = {
  isEnded: boolean;
};

export type ButtonInfo = {
  text: string;
  link: NonEmptyArray<다짐_도전_퍼널_Key>[number];
};

class ChallengeModel {
  private static instance: ChallengeModel;
  session: Session | null = null;
  challengeData: ChallengeData | null = null;
  private listeners: Listener[] = [];

  static getInstance(): ChallengeModel {
    if (!ChallengeModel.instance) {
      ChallengeModel.instance = new ChallengeModel();
    }
    return ChallengeModel.instance;
  }

  setSession(newSession: Session) {
    this.session = newSession;
    this.checkAndNotify();
  }

  setChallengeData(newData: ChallengeData) {
    this.challengeData = newData;
    this.checkAndNotify();
  }

  addEventListener(listener: Listener) {
    this.listeners.push(listener);
  }

  removeEventListener(listener: Listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  private checkAndNotify() {
    if (this.session) {
      this.notifyListeners();
    }
  }

  getButtonInfo(): ButtonInfo {
    const isOrganizer = this.session;
    const isChallengeEnded = false;

    if (isOrganizer) {
      return isChallengeEnded
        ? { text: '내기 종료', link: '다짐_도전' }
        : { text: 'n일차 인증하기', link: '다짐_인증' };
    } else {
      return isChallengeEnded
        ? { text: '결과 보기', link: '다짐_인증' }
        : { text: '나도 내기 만들기', link: '다짐_인증_완료' };
    }
  }
}

const challengeModel = ChallengeModel.getInstance();
export default challengeModel;
