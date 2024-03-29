import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { RecoilRoot } from 'recoil';
import { EcosurTheme } from 'ecosur-ui';
import DataComponent from '@modules/auth/components/data';
import '../src/styles/global.css';
import { SnackbarProvider } from 'notistack';
import { SnackBarUtilitiesConfigurator } from '@shared/utilities/snackbar-manager';

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
    <SnackbarProvider dense>
      <SnackBarUtilitiesConfigurator />
      <RecoilRoot>
        <DataComponent />
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <EcosurTheme>{getLayout(<Component {...pageProps} />)}</EcosurTheme>
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </SnackbarProvider>
  );
}

export default MyApp;
