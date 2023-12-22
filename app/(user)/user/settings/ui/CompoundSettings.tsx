import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import ButtonWrapper from '@/app/common/ui/Button/ButtonWrapper';
import Text from '@/app/common/ui/Text/Text';
import TextArea from '@/app/common/ui/TextArea/TextArea';
import { Color } from '@/app/common/ui/colors.css';
import { fixedButtonOverWrapper } from '@/app/common/ui/common.css';
import { ChangeEvent, ReactNode } from 'react';
import { TextareaAutosizeProps } from 'react-textarea-autosize';
import { settingsPageStyles } from '../settings.css';

interface CompoundSettingsProps {
  children: ReactNode;
}

const CompoundSettings = ({ children }: CompoundSettingsProps) => {
  return <>{children}</>;
};

interface UserInfoProps {
  nickname: string;
}

const UserInfo = ({ nickname }: UserInfoProps) => {
  return (
    <div className={settingsPageStyles.headerTextWrapper}>
      <Text.TitleH2 color="cyan300">{nickname}</Text.TitleH2>
      <Text.TitleH2 color="white">님</Text.TitleH2>
    </div>
  );
};

type EditInputProps = {
  title: string;
  children: ReactNode;
  value: string;
  disabled: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
} & TextareaAutosizeProps;

const EditInput = ({ title, value, disabled, children, onChange, ...rest }: EditInputProps) => {
  return (
    <TextArea>
      <div className={settingsPageStyles.textAreaWrapper}>
        <div className={settingsPageStyles.textAreaDescriptionAndButtonWrapper}>
          <Text.BodyS color="white">{title}</Text.BodyS>
          <div className={settingsPageStyles.stateButtonWrapper}>{children}</div>
        </div>
        <TextArea.Base
          value={value}
          onChange={onChange}
          maxRows={1}
          minRows={1}
          rows={1}
          disabled={disabled}
          withCount={{
            max: 7,
            initialVisible: true,
          }}
          {...rest}
        />
      </div>
    </TextArea>
  );
};

interface StateChangeButtonProps {
  color?: Color;
  onClick: () => void;
  children: ReactNode;
}

const StateChangeButton = ({ color = 'grey500', onClick, children }: StateChangeButtonProps) => {
  return (
    <ButtonWrapper onClick={onClick}>
      <Text.ButtonM color={color}>{children}</Text.ButtonM>
    </ButtonWrapper>
  );
};

EditInput.StateChangeButton = StateChangeButton;

interface ExitServiceButtonProps {
  onClickWithdrawal: () => void;
  onClickLogout: () => void;
}

const ExitServiceButton = ({ onClickWithdrawal, onClickLogout }: ExitServiceButtonProps) => {
  return (
    <BottomFixedButton>
      <BottomFixedButton.OverItem className={fixedButtonOverWrapper}>
        <ButtonWrapper onClick={onClickWithdrawal}>
          <Text.ButtonM color="grey400">회원탈퇴</Text.ButtonM>
        </ButtonWrapper>
      </BottomFixedButton.OverItem>
      <BottomFixedButton.First onClick={onClickLogout} color="grey800-active">
        <Text.ButtonL color="grey500">로그아웃</Text.ButtonL>
      </BottomFixedButton.First>
    </BottomFixedButton>
  );
};

CompoundSettings.UserInfo = UserInfo;
CompoundSettings.EditInput = EditInput;
CompoundSettings.ExitServiceButton = ExitServiceButton;

export default CompoundSettings;
