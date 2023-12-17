import { LoginFunnelProps } from '../../page';

interface HandleNicknameProps extends LoginFunnelProps {}

const useHandleNickname = ({ user, setUser, onNext }: HandleNicknameProps) => {
  // USER INTERACTION
  // 1. 유저 > 닉네임 placeholder
  const placeholder = user.nickname.length > 0 ? user.nickname : '닉네임을 입력해주세요';

  // 1. 유저 > 닉네임 입력
  const onChangeNickname = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUser((prev) => ({ ...prev, nickname: e.target.value }));
  };

  // 2. 유저 > 다음으로
  const isAllFilled = user.nickname.length > 0;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAllFilled) return;
    onNext();
  };

  return { placeholder, isAllFilled, onChangeNickname, onSubmit };
};

export default useHandleNickname;
