import React from 'react';
import { AppProps } from 'next/app';
import { StyledThemeProvider } from '@definitions/styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { RecoilRoot } from 'recoil';

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: unknown }>): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <StyledThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </Hydrate>
      </QueryClientProvider>
    </StyledThemeProvider>
  );
}

export default MyApp;
