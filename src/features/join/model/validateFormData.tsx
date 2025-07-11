import { SponsorFormData, UserFormData } from '../type/FormDataType';

const isEmpty = (value: string) => value.trim() === '';

export const validateFormData = (
  isSponsor: boolean,
  userData: UserFormData,
  sponsorData: SponsorFormData,
) => {
  // 현재는 빈 값 체크만.
  if (isSponsor) {
    // 협찬사 유효성검사
    const { name, loginId, password, eqPassword, sponsorNumber, sponsorName, category, isValid } =
      sponsorData;

    return !(
      isEmpty(name) ||
      isEmpty(loginId) ||
      isEmpty(password) ||
      isEmpty(eqPassword) ||
      password !== eqPassword ||
      isEmpty(sponsorNumber) ||
      isEmpty(sponsorName) ||
      isEmpty(category) ||
      !isValid
    );
  } else {
    // 일반유저 유효성검사
    const { name, loginId, password, eqPassword, cardPassword } = userData;

    return !(
      isEmpty(name) ||
      isEmpty(loginId) ||
      isEmpty(password) ||
      isEmpty(eqPassword) ||
      password !== eqPassword ||
      isEmpty(cardPassword) ||
      cardPassword.length !== 4 ||
      isNaN(Number(cardPassword))
    );
  }
};
