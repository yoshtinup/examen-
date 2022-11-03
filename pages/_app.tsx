import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { RecoilRoot } from 'recoil';
import { EcosurTheme } from 'ecosur-ui';
import { DataComponent } from '@modules/auth/components/data';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<T> = AppProps<T> & {
  Component: NextPageWithLayout<T>;
};

function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayout<{ dehydratedState: unknown }>): JSX.Element {
  const queryClient = new QueryClient();
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <RecoilRoot>
      <DataComponent />
      <EcosurTheme>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            {getLayout(<Component {...pageProps} />)}
          </Hydrate>
        </QueryClientProvider>
      </EcosurTheme>
    </RecoilRoot>
  );
}

export default MyApp;
