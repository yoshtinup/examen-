import React from 'react';
import { Wrapper, Container } from './styled';
import { Button } from 'ecosur-ui';

export const Main: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Wrapper>
      <Container>Main ECOSUR</Container>
      <Button
        backgroundColor="#8f3c3c"
        label="Button ECOSUR"
        primary
        size="large"
      />
    </Wrapper>
  );
};
