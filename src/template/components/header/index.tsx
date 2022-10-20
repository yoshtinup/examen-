import React from 'react';

import { Logo } from 'src/template/components';
import { Wrapper, Container } from './styled';

export const Header: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Wrapper>
      <Container>
        <Logo /> Header ECOSUR
      </Container>
    </Wrapper>
  );
};
