import styled from '@emotion/styled';
import { Button, Input } from '../../../shared/ui';
import { SponsorFormData } from '../type/FormDataType';
import { Category } from './Category';
import { useVerifySponsor } from '../api/useVerifySponsor';
import { toast } from 'react-toastify';
import useDevice from '../../../shared/hooks/useDevice';

export const JoinSponsorForm = ({
  formData,
  setFormData,
}: {
  formData: SponsorFormData;
  setFormData: React.Dispatch<React.SetStateAction<SponsorFormData>>;
}) => {
  const { isMobile } = useDevice();
  const { verifySponsor } = useVerifySponsor();

  // 데이터 핸들링
  const handleData = (type: keyof SponsorFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [type]: e.target.value }));
  };

  // 사업자 인증 API
  const checkSponsor = async () => {
    const isValid = await verifySponsor(formData.sponsorNumber);
    if (isValid) {
      toast.success('사업자 인증에 성공했습니다.');
      setFormData((prev) => ({ ...prev, isValid: true }));
    } else {
      toast.error('사업자 인증에 실패했습니다.');
      setFormData((prev) => ({ ...prev, isValid: false }));
    }
  };

  return (
    <Container>
      <Input placeholder="이름" value={formData.name} onChange={handleData('name')} />
      <Input placeholder="아이디" value={formData.loginId} onChange={handleData('loginId')} />
      <Input
        type="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleData('password')}
      />
      <Input
        type="password"
        placeholder="비밀번호 확인"
        value={formData.eqPassword}
        onChange={handleData('eqPassword')}
      />
      <div className="business-form">
        <BusinessInput
          maxLength={10}
          placeholder="사업자등록번호(10자리)"
          value={formData.sponsorNumber.toString()}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, sponsorNumber: e.target.value, isValid: false }))
          }
        />
        <Button
          width={isMobile ? '4rem' : '5rem'}
          padding="0.75rem 1.25rem"
          textSize={isMobile ? '0.75rem' : '1.25rem'}
          onClick={checkSponsor}
        >
          인증
        </Button>
      </div>
      <Input
        placeholder="회사명"
        value={formData.sponsorName}
        onChange={handleData('sponsorName')}
      />
      <Category
        category={formData.category}
        setBCategory={(category, categoryId) =>
          setFormData((prev) => ({ ...prev, category: category, categoryId: categoryId }))
        }
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;

  .business-form {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
`;

const BusinessInput = styled(Input)`
  max-width: 15.5rem;
`;
