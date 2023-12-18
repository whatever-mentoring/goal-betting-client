import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { LoginFunnelProps } from '../../page';
import { usePUTNickname } from '../api/nickname';
import { useGETUserInfoQuery } from '../api/user';

interface HandleNicknameProps extends LoginFunnelProps {}

const useHandleNickname = ({ user, setUser, onNext }: HandleNicknameProps) => {
  const { data: userInfo } = useGETUserInfoQuery();

  useEffect(() => {
    if (userInfo?.data) {
      setUser({
        nickname: userInfo.data.nickname.value,
      });
    }
  }, [userInfo]);
  // USER INTERACTION
  // 1. 유저 > 닉네임 placeholder
  const placeholder = user.nickname.length > 0 ? user.nickname : '닉네임을 입력해주세요';

  // 1. 유저 > 닉네임 입력
  const onChangeNickname = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUser((prev) => ({ ...prev, nickname: e.target.value }));
  };

  // 2. 유저 > 다음으로
  const isAllFilled = user.nickname.length > 0;

  // 3. 닉네임 저장
  const { data } = useSession();
  const { mutate } = usePUTNickname();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAllFilled) return;
    mutate({ putData: { nickname: user.nickname }, token: data?.user.accessToken });
    onNext();
  };

  return { placeholder, isAllFilled, onChangeNickname, onSubmit };
};

export default useHandleNickname;
