import { useMediaQuery } from 'react-responsive';

type DeviceType = {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
};

const useDevice = (): DeviceType => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' }); // PC
  const isTablet = useMediaQuery({ query: '(min-width: 769px) and (max-width: 1024px)' }); // 태블릿
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // 모바일

  return { isDesktop, isTablet, isMobile };
};

export default useDevice;
