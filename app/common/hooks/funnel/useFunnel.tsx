import { useRouter, useSearchParams } from 'next/navigation';
import { Children, ReactElement, isValidElement, useCallback, useEffect, useMemo } from 'react';
import { NonEmptyArray } from './models';

interface FunnelProps<Steps extends NonEmptyArray<string>> {
  steps: Steps;
  step: Steps[number];
  children: Array<ReactElement<StepProps<Steps>>> | ReactElement<StepProps<Steps>>;
}

interface StepProps<Steps extends NonEmptyArray<string>> {
  name: Steps[number];
  onEnter?: () => void;
  children: React.ReactNode;
}

type RouteFunnelProps<Steps extends NonEmptyArray<string>> = Omit<
  FunnelProps<Steps>,
  'steps' | 'step'
>;

type FunnelComponent<Steps extends NonEmptyArray<string>> = ((
  props: RouteFunnelProps<Steps>,
) => JSX.Element) & {
  Step: (props: StepProps<Steps>) => JSX.Element;
};

const Funnel = <Steps extends NonEmptyArray<string>>({
  steps,
  step,
  children,
}: FunnelProps<Steps>) => {
  const validChildren = Children.toArray(children)
    .filter(isValidElement)
    .filter((child) => steps.includes((child.props as Partial<StepProps<Steps>>).name ?? ''))
    .map((child) => child as ReactElement<StepProps<Steps>>);

  const targetStep = validChildren.find((child) => child.props.name === step);

  return <>{targetStep}</>;
};

const Step = <Steps extends NonEmptyArray<string>>({
  name,
  onEnter,
  children,
}: StepProps<Steps>) => {
  useEffect(() => {
    if (onEnter) {
      onEnter();
    }
  }, [name, onEnter]);

  return <>{children}</>;
};

export const useFunnel = <Steps extends NonEmptyArray<string>>(
  steps: Steps,
): readonly [FunnelComponent<Steps>, (step: Steps[number]) => void] => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const step = useMemo(() => {
    const step = searchParams.get('step');

    if (typeof step === 'string' && steps.includes(step)) {
      return step;
    }

    return steps[0];
  }, [searchParams, steps]);

  const setStep = useCallback(
    (step: Steps[number]) => {
      router.push(`?step=${step}`);
    },
    [router],
  );

  const FunnelComponent = useMemo(
    () =>
      Object.assign(
        function RouteFunnel(props: RouteFunnelProps<Steps>) {
          return <Funnel<Steps> steps={steps} step={step} {...props} />;
        },
        {
          Step,
        },
      ),

    [searchParams],
  );

  FunnelComponent.Step = Step;

  return [FunnelComponent, setStep] as const;
};
