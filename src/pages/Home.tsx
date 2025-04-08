import { useRef } from 'react';
import styled from '@emotion/styled';
import { Fade } from 'react-awesome-reveal';
import { FirstSection } from '../components/home/FirstSection';
import { SecondSection } from '../components/home/SecondSection';
import { ThirdSection } from '../components/home/ThirdSection';
import { FourthSection } from '../components/home/FourthSection';
import { FifthSection } from '../components/home/FifthSection';

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
