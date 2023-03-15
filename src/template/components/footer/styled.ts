import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LogoButton = styled.a`
  display: block;
  margin-bottom: 0.19rem;
`;
