import { ReactNode, useEffect } from 'react';

// value와 checkKey가 모두 있는 경우
interface RefreshCheckPropsWithValues<T extends object> {
  value: T;
  checkKey: keyof T;
  onRefresh: () => void;
  children: ReactNode;
}

// value와 checkKey가 모두 없는 경우
interface RefreshCheckPropsWithoutValues {
  value?: never;
  checkKey?: never;
  onRefresh: () => void;
  children: ReactNode;
}

function RefreshCheck<T extends object>(props: RefreshCheckPropsWithValues<T>): JSX.Element;
function RefreshCheck(props: RefreshCheckPropsWithoutValues): JSX.Element;

function RefreshCheck<T extends object>({
  value,
  checkKey,
  onRefresh,
  children,
}: RefreshCheckPropsWithValues<T> | RefreshCheckPropsWithoutValues) {
  useEffect(() => {
    const isPageLoaded = sessionStorage.getItem('loaded');

    if (!isPageLoaded) {
      sessionStorage.setItem('loaded', 'true');
    }

    // 체크할 값이 있는 경우 해당 값이 없으면 새로고침
    if (value && checkKey && isPageLoaded) {
      if (!value[checkKey]) onRefresh();
    }
    // 체크할 값이 없는 경우 새로고침
    if (!value && !checkKey && isPageLoaded) onRefresh();

    return () => {
      sessionStorage.removeItem('loaded');
    };
  }, [value, checkKey, onRefresh]);

  return <>{children}</>;
}

export default RefreshCheck;
