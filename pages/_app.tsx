import React from 'react';
import { AppProps } from 'next/app';
import { StyledThemeProvider } from '@definitions/styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { RecoilRoot } from 'recoil';
import { DataComponent } from '@modules/auth/components/data';

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: unknown }>): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <StyledThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <DataComponent />
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </StyledThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
