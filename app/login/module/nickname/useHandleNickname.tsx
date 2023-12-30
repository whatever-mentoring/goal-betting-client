import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { LoginFunnelProps } from '../../page';
import { usePUTNickname, usePostCheckNicknameMutation } from '../api/nickname';
import { useGETUserInfoQuery } from '../api/user';

interface HandleNicknameProps extends LoginFunnelProps {}

const useHandleNickname = ({ user, setUser, onNext }: HandleNicknameProps) => {
  const { data: userInfo } = useGETUserInfoQuery();

  useEffect(() => {
    if (userInfo?.data) {
      setUser({
        nickname: userInfo.data.nickname.value,
      });
      setDebounceNickname(userInfo.data.nickname.value);
    }
  }, [userInfo]);
  // USER INTERACTION
  // 1. 유저 > 닉네임 placeholder
  const placeholder = user.nickname.length > 0 ? user.nickname : '닉네임을 입력해주세요';

  // 1. 유저 > 닉네임 입력
  const onChangeNickname = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUser((prev) => ({ ...prev, nickname: e.target.value }));
    debouncedChangeNickname(e.target.value);
    if (e.target.value === '') {
      setIsNicknameDuplicated(false);
    }
  };

  // 2. 유저 > 다음으로
  const isAllFilled = user.nickname.length > 0;

  // 3. 닉네임 저장
  const { mutate: nicknameChange } = usePUTNickname();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAllFilled) return;
    nicknameChange({ putData: { nickname: user.nickname } });
    onNext();
  };

  // 4. 닉네임 중복 여부
  const [debounceNickname, setDebounceNickname] = useState('');
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState(false);
  const { mutate: nicknameCheck } = usePostCheckNicknameMutation();

  const debouncedChangeNickname = useCallback(
    debounce((url) => setDebounceNickname(url), 750),
    [],
  );

  useEffect(() => {
    nicknameCheck(
      { postData: { nickname: debounceNickname } },
      {
        onSuccess: (data) => {
          setIsNicknameDuplicated(data.data.nicknameIsDuplicated);
        },
      },
    );
  }, [debounceNickname]);

  return {
    placeholder,
    isAllFilled: !isNicknameDuplicated,
    isNicknameDuplicated,
    onChangeNickname,
    onSubmit,
  };
};

export default useHandleNickname;
