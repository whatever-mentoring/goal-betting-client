import { useDELETEUserInfoMutation } from '@/app/login/module/api/deleteUser';
import { usePUTNickname } from '@/app/login/module/api/nickname';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface Input {
  nickname: {
    disabled: boolean;
    value: string;
    defaultValue: string;
    state: 'NORMAL' | 'EDIT';
  };
}

const useHandleUserInfo = () => {
  const { data: sessionData } = useSession();

  const [input, setInput] = useState<Input>({
    nickname: {
      disabled: true,
      value: '',
      defaultValue: '',
      state: 'NORMAL',
    },
  });

  useEffect(() => {
    if (!sessionData?.user.nickname) return;
    setInput((prev) => ({
      ...prev,
      nickname: {
        ...prev.nickname,
        value: sessionData.user.nickname,
        defaultValue: sessionData.user.nickname,
      },
    }));
  }, [sessionData?.user.nickname]);

  const onToggleInput = (key: keyof Input) => {
    setInput((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        value: prev[key].disabled ? prev[key].value : prev[key].defaultValue,
        disabled: !prev[key].disabled,
      },
    }));
  };

  const onChangeInput = (key: keyof Input, value: string) => {
    setInput((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        value,
      },
    }));
  };

  const { mutate: putUserNickname } = usePUTNickname();
  const onClickSaveInput = () => {
    if (!sessionData?.user.nickname) return;
    if (input.nickname.value === sessionData.user.nickname) {
      setInput((prev) => ({
        ...prev,
        nickname: {
          ...prev.nickname,
          disabled: true,
        },
      }));
      return;
    }
    putUserNickname({
      putData: {
        nickname: input.nickname.value,
      },
    });
    setInput((prev) => ({
      ...prev,
      nickname: {
        ...prev.nickname,
        disabled: true,
      },
    }));
  };

  // 유저 > 로그아웃
  const onClickLogout = () => {
    signOut();
    alert('로그아웃 되었습니다.');
  };

  // 유저 > 회원탈퇴
  const { mutate: deleteUserInfo } = useDELETEUserInfoMutation();

  const onClickDeleteUser = () => {
    deleteUserInfo();
    signOut();
    alert('회원탈퇴가 완료되었습니다.');
  };

  return {
    nickname: sessionData?.user.nickname,
    input,
    onToggleInput,
    onChangeInput,
    onClickSaveInput,
    onClickLogout,
    onClickDeleteUser,
  };
};

export default useHandleUserInfo;
