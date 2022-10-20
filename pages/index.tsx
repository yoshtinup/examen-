import React from 'react';
import { Wrapper, Header, Main, Footer } from '@template/components';
import GlobalStyle from '@styles/globalStyles';

const Home: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <Header />
      <Main />
      <Footer />
    </Wrapper>
  );
};
export default Home;
