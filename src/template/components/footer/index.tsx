import React from 'react';
import Image from 'next/image';

import { Container, LogoButton } from './styled';

export const Footer: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Container>
      <LogoButton href="https://ecosur.mx" target="_blank">
        <Image src="/icons/ecosur.svg" alt="pankod" width="140" height="28" />
      </LogoButton>{' '}
      Footer ECOSUR
    </Container>
  );
};
