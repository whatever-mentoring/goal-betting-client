import { useRouter } from 'next/navigation';
import { ChallengeCertificationFunnelProps } from '../../challenge/[goalId]/certificate/page';
import { usePOSTChallengeCertificate } from '../api/postChallenge';

type OmitOnNext = Omit<ChallengeCertificationFunnelProps, 'setCertification'>;

interface HandleCertificateProps extends OmitOnNext {
  onNext: () => (certificationId: number) => string;
  goalId: number;
}

const useHandleCertificate = ({ certification, goalId, onNext }: HandleCertificateProps) => {
  const router = useRouter();
  const { mutate: postCertificate } = usePOSTChallengeCertificate({
    onSuccess: (data) => {
      router.push(onNext()(data.data.goalProofRetrieveResponse.id));
    },
  });

  const onClickSubmit = () => {
    postCertificate({
      postData: {
        goalId: goalId,
        url: certification.imageSrc!,
        comment: certification.text,
      },
    });
  };

  return { onClickSubmit };
};

export default useHandleCertificate;
