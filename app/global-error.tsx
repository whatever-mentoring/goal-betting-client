'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import navigationPath from './common/navigation/navigationPath';
import CenterBlank from './common/ui/Blank/CenterBlank';
import BottomFixedButton from './common/ui/Button/BottomFixedButton';
import Text from './common/ui/Text/Text';
import { errorStyles } from './layout.css';

const GlobalErrorPage = () => {
  const router = useRouter();

  const onClickHome = () => {
    router.push(navigationPath.홈_페이지);
  };

  return (
    <>
      <CenterBlank>
        <div className={errorStyles.imageWrapper}>
          <Image src="/images/mirr/mirr_sad.png" alt="error" fill className={errorStyles.image} />
        </div>
        <div className={errorStyles.textWrapper}>
          <Text.TitleH2>접근할 수 없는 페이지 입니다</Text.TitleH2>
        </div>
      </CenterBlank>
      <BottomFixedButton>
        <BottomFixedButton.First onClick={onClickHome} color="purple500-active">
          <Text.ButtonL color={'white'}>홈으로 가기</Text.ButtonL>
        </BottomFixedButton.First>
      </BottomFixedButton>
    </>
  );
};

export default GlobalErrorPage;
