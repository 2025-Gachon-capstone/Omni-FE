import { useRef } from 'react';
import styled from '@emotion/styled';
import { Fade } from 'react-awesome-reveal';
import { FirstSection } from '../features/home/ui/FirstSection';
import { SecondSection } from '../features/home/ui/SecondSection';
import { ThirdSection } from '../features/home/ui/ThirdSection';
import { FourthSection } from '../features/home/ui/FourthSection';
import { FifthSection } from '../features/home/ui/FifthSection';

const Home = () => {
  const scrollDownRef = useRef<HTMLDivElement>(null); // 스크롤 섹션 참조
  const scrollSection = () => {
    scrollDownRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Container>
      <Fade direction={'up'} duration={1500} triggerOnce>
        <FirstSection scrollSection={scrollSection} />
      </Fade>
      <SecondSection ref={scrollDownRef} />
      <Fade cascade damping={0.3} triggerOnce>
        <ThirdSection />
      </Fade>
      <FourthSection />
      <FifthSection />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  max-width: 100vw;
`;
