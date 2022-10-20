import React from 'react';
import { Container } from './styled';

export const Wrapper: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return <Container>{children}</Container>;
};
