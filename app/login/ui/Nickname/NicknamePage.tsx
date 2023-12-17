import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import TextArea from '@/app/common/ui/TextArea/TextArea';
import { headerTextWrapper, withPreWrapCenter } from '@/app/common/ui/common.css';
import useHandleNickname from '../../module/nickname/useHandleNickname';
import { LoginFunnelProps } from '../../page';
import { nicknamePageStyles } from './nickname.css';

interface NicknamePageProps extends LoginFunnelProps {}

const NicknamePage = ({ user, setUser, onNext }: NicknamePageProps) => {
  const { placeholder, isAllFilled, onChangeNickname, onSubmit } = useHandleNickname({
    user,
    setUser,
    onNext,
  });
  return (
    <>
      <Header showBackButton />
      <div className={headerTextWrapper}>
        <Text.TitleH1 className={withPreWrapCenter}>
          {'나는 청룡이야\n너는 이름이 뭐야?'}
        </Text.TitleH1>
      </div>
      <form onSubmit={onSubmit} className={nicknamePageStyles.inputWrapper}>
        <TextArea>
          <TextArea.Base
            placeholder={placeholder}
            value={user.nickname}
            onChange={onChangeNickname}
            maxRows={1}
            rows={1}
            withCount={{
              max: 7,
            }}
            required
          />
        </TextArea>
        <BottomFixedButton>
          <BottomFixedButton.First
            disabled={!isAllFilled}
            color="purple500-active"
            width={100}
            type="submit"
          >
            <Text.ButtonL color={isAllFilled ? 'white' : 'grey400'}>다음으로</Text.ButtonL>
          </BottomFixedButton.First>
        </BottomFixedButton>
      </form>
    </>
  );
};

export default NicknamePage;
