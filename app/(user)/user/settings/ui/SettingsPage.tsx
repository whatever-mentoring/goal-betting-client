import Header from '@/app/common/ui/Header/Header';
import useHandleUserInfo from '../module/useHandleUserInfo';
import CompoundSettings from './CompoundSettings';

const SettingsPage = () => {
  const {
    nickname,
    input,
    isNicknameDuplicated,
    onChangeInput,
    onToggleInput,
    onClickSaveInput,
    onClickDeleteUser,
    onClickLogout,
  } = useHandleUserInfo();
  return (
    <>
      <Header showBackButton />
      <CompoundSettings>
        {/** 유저 정보 */}
        <CompoundSettings.UserInfo nickname={nickname ?? ''} />
        {/** 닉네임 수정 */}
        <CompoundSettings.EditInput
          title="닉네임"
          value={input.nickname.value}
          disabled={input.nickname.disabled}
          onChange={(e) => onChangeInput('nickname', e.target.value)}
          inputUnderText={isNicknameDuplicated ? '중복된 닉네임입니다' : undefined}
        >
          {!!input.nickname.disabled && (
            <CompoundSettings.EditInput.StateChangeButton onClick={() => onToggleInput('nickname')}>
              수정
            </CompoundSettings.EditInput.StateChangeButton>
          )}
          {!input.nickname.disabled && (
            <>
              <CompoundSettings.EditInput.StateChangeButton
                onClick={() => onToggleInput('nickname')}
              >
                취소
              </CompoundSettings.EditInput.StateChangeButton>
              <CompoundSettings.EditInput.StateChangeButton
                color={input.nickname.value !== input.nickname.defaultValue ? 'cyan300' : 'grey600'}
                onClick={onClickSaveInput}
              >
                저장
              </CompoundSettings.EditInput.StateChangeButton>
            </>
          )}
        </CompoundSettings.EditInput>
        {/** 로그아웃 및 회원탈퇴 */}
        <CompoundSettings.ExitServiceButton
          onClickWithdrawal={onClickDeleteUser}
          onClickLogout={onClickLogout}
        />
      </CompoundSettings>
    </>
  );
};

export default SettingsPage;
