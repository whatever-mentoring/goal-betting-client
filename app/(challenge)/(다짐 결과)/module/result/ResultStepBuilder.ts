import navigationPath, { 다짐_결과_퍼널_Key } from '@/app/common/navigation/navigationPath';

type Funnel = {
  type: 'funnel';
  step: 다짐_결과_퍼널_Key;
};

type Link = {
  type: 'link';
  link: string;
};

export interface BuilderStep {
  headerText: string;
  buttonText: string;
  buttonTo?: Funnel | Link;
}

interface ActionHandler {
  getSteps(): BuilderStep[];
}

const successText = (nickname: string) => `${nickname}님이\n다짐을 성공했어!`;
const failText = (nickname: string) => `${nickname}님이\n다짐을 실패했어 ㅠㅠ`;

const winnerText = (nickname: string) => `${nickname}님이\n당첨됐어`;

class 주최자_다짐성공_기프티콘있음 implements ActionHandler {
  constructor(private nickname: string) {}

  getSteps(): BuilderStep[] {
    return [
      {
        headerText: successText(this.nickname),
        buttonText: '기프티콘 가져가기',
        buttonTo: {
          type: 'funnel',
          step: '도전_결과_저장',
        },
      },
    ];
  }
}

class 주최자_다짐성공_기프티콘없음 implements ActionHandler {
  constructor(private nickname: string) {}
  getSteps(): BuilderStep[] {
    return [
      {
        headerText: successText(this.nickname),
        buttonText: '다음으로',
        buttonTo: {
          type: 'funnel',
          step: '도전_결과_저장',
        },
      },
    ];
  }
}

class 주최자_다짐실패_기프티콘있음 implements ActionHandler {
  constructor(
    private nickname: string,
    private winnerNickname: string,
  ) {}
  getSteps(): BuilderStep[] {
    return [
      {
        headerText: failText(this.nickname),
        buttonText: '기프티콘 룰렛 돌리기',
      },
      {
        headerText: winnerText(this.winnerNickname),
        buttonText: '다음으로',
        buttonTo: {
          type: 'funnel',
          step: '도전_결과_저장',
        },
      },
    ];
  }
}

class 주최자_다짐실패_기프티콘없음 implements ActionHandler {
  constructor(private nickname: string) {}
  getSteps(): BuilderStep[] {
    return [
      {
        headerText: failText(this.nickname),
        buttonText: '나도 내기 만들기',
        buttonTo: {
          type: 'link',
          link: navigationPath.다짐_생성_퍼널.다짐_입력,
        },
      },
    ];
  }
}

class 참여자_다짐성공_기프티콘있음 implements ActionHandler {
  constructor(private nickname: string) {}
  getSteps(): BuilderStep[] {
    return [
      {
        headerText: successText(this.nickname),
        buttonText: '나도 내기 만들기',
        buttonTo: {
          type: 'link',
          link: navigationPath.다짐_생성_퍼널.다짐_입력,
        },
      },
    ];
  }
}

class 참여자_다짐성공_기프티콘없음 implements ActionHandler {
  constructor(private nickname: string) {}
  getSteps(): BuilderStep[] {
    return [
      {
        headerText: successText(this.nickname),
        buttonText: '나도 내기 만들기',
        buttonTo: {
          type: 'link',
          link: navigationPath.다짐_생성_퍼널.다짐_입력,
        },
      },
    ];
  }
}

class 참여자_다짐실패_기프티콘있음_당첨 implements ActionHandler {
  constructor(private nickname: string) {}
  getSteps(): BuilderStep[] {
    return [
      {
        headerText: failText(this.nickname),
        buttonText: '기프티콘 룰렛 돌리기',
      },
      {
        headerText: '기프티콘에 당첨됐어!',
        buttonText: '기프티콘 받기',
        buttonTo: {
          type: 'link',
          link: navigationPath.다짐_결과_퍼널(0).도전_기프티콘,
        },
      },
    ];
  }
}

class 참여자_다짐실패_기프티콘있음_미당첨 implements ActionHandler {
  constructor(
    private nickname: string,
    private winnerNickname: string,
  ) {}
  getSteps(): BuilderStep[] {
    return [
      {
        headerText: failText(this.nickname),
        buttonText: '기프티콘 룰렛 돌리기',
      },
      {
        headerText: winnerText(this.winnerNickname),
        buttonText: '나도 내기 만들기',
        buttonTo: {
          type: 'link',
          link: navigationPath.다짐_생성_퍼널.다짐_입력,
        },
      },
    ];
  }
}

interface StepBuilderConstructor {
  nickname: string;
  isOwner: boolean;
  isSuccess: boolean;
  hasGifticon: boolean;
  winnerNickname: string;
  isWinner?: boolean;
}

export class ResultStepBuilder {
  private nickname: string;
  private isOwner: boolean;
  private isSuccess: boolean;
  private hasGifticon: boolean;
  private winnerNickname: string;
  private isWinner?: boolean;

  constructor({
    nickname,
    isOwner,
    isSuccess,
    hasGifticon,
    winnerNickname,
    isWinner,
  }: StepBuilderConstructor) {
    this.nickname = nickname;
    this.isOwner = isOwner;
    this.isSuccess = isSuccess;
    this.hasGifticon = hasGifticon;
    this.winnerNickname = winnerNickname;
    this.isWinner = isWinner ?? false;
  }

  build(): ActionHandler | null {
    if (this.isOwner && this.isSuccess && this.hasGifticon) {
      return new 주최자_다짐성공_기프티콘있음(this.nickname);
    }
    if (this.isOwner && this.isSuccess && !this.hasGifticon) {
      return new 주최자_다짐성공_기프티콘없음(this.nickname);
    }
    if (this.isOwner && !this.isSuccess && this.hasGifticon) {
      return new 주최자_다짐실패_기프티콘있음(this.nickname, this.winnerNickname);
    }
    if (this.isOwner && !this.isSuccess && !this.hasGifticon) {
      return new 주최자_다짐실패_기프티콘없음(this.nickname);
    }
    if (!this.isOwner && this.isSuccess && this.hasGifticon) {
      return new 참여자_다짐성공_기프티콘있음(this.nickname);
    }
    if (!this.isOwner && this.isSuccess && !this.hasGifticon) {
      return new 참여자_다짐성공_기프티콘없음(this.nickname);
    }
    if (!this.isOwner && !this.isSuccess && this.hasGifticon && this.isWinner) {
      return new 참여자_다짐실패_기프티콘있음_당첨(this.nickname);
    }
    if (!this.isOwner && !this.isSuccess && !this.hasGifticon) {
      return new 참여자_다짐실패_기프티콘있음_미당첨(this.nickname, this.winnerNickname);
    }
    return null;
  }
}
