type 로그인_퍼널_Key = '로그인' | '닉네임_설정';

const 로그인_퍼널: Record<로그인_퍼널_Key, string> = {
  로그인: '/login',
  닉네임_설정: '/login?step=닉네임_설정',
};

const 홈_페이지 = '/';

export type 다짐_생성_퍼널_Key =
  | '다짐_입력'
  | '기프티콘_업로드'
  | '다짐_시작일'
  | '다짐_등록_확인'
  | '다짐_등록_완료';

const 다짐_생성_퍼널: Record<다짐_생성_퍼널_Key, string> = {
  다짐_입력: '/add',
  기프티콘_업로드: '/add?step=기프티콘_업로드',
  다짐_시작일: '/add?step=다짐_시작일',
  다짐_등록_확인: '/add?step=다짐_등록_확인',
  다짐_등록_완료: '/add?step=다짐_등록_완료',
};

export const 다짐_공유_페이지 = (goalId: number) => `/share/${goalId}`;

export type 다짐_도전_퍼널_Key = '다짐_인증' | '다짐_인증_확인';

const 다짐_페이지 = (goalId: number) => `/challenge/${goalId}`;

const 다짐_도전_퍼널 = (goalId: number): Record<다짐_도전_퍼널_Key, string> => ({
  다짐_인증: `/challenge/${goalId}/certificate?step=다짐_인증`,
  다짐_인증_확인: `/challenge/${goalId}/certificate?step=다짐_인증_확인`,
});

const 다짐_인증_확인_페이지 = (goalId: number) => (certificationId: number) =>
  `/challenge/${goalId}/certificate/${certificationId}`;

export type 다짐_결과_퍼널_Key = '도전_결과' | '도전_결과_저장' | '도전_기프티콘';

const 다짐_결과_퍼널 = (goalId: number) => ({
  도전_결과: `/result/${goalId}/`,
  도전_결과_저장: `/result/${goalId}/?step=도전_결과_저장`,
  도전_기프티콘: `/result/${goalId}/?step=도전_기프티콘`,
});

const 유저_목록_페이지 = (goalId: number) => `/challenge/${goalId}/users`;

const 유저_설정 = {
  계정_설정: '/user/settings',
  다짐_목록: '/user/challenges',
};

export default {
  로그인_퍼널,
  홈_페이지,
  다짐_생성_퍼널,
  다짐_페이지,
  다짐_공유_페이지,
  다짐_도전_퍼널,
  다짐_인증_확인_페이지,
  다짐_결과_퍼널,
  유저_목록_페이지,
  유저_설정,
};
