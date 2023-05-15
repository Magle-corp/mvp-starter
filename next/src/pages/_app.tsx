import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { addLocale, locale } from 'primereact/api';
import primeLocaleFr from '@/cdn/i18n/primeLocaleFr.json';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { GlobalStyle, ThemeWrapper } from '@/theme';
import { AppContextWrapper } from '@/cdn/AppContext';

const DynToast = dynamic(() =>
  import('@/ui/atoms/Toast').then((Toast) => Toast)
);

const DynConfirmDialog = dynamic(() =>
  import('@/ui/atoms/ConfirmDialog').then((ConfirmDialog) => ConfirmDialog)
);

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = Partial<AppProps> & {
  Component: NextPageWithLayout;
};

const Layout = ({
  Component,
  pageProps,
}: AppPropsWithLayout): JSX.Element | null => {
  if (Component.getLayout) {
    return <>{Component.getLayout(<Component {...pageProps} />)}</>;
  } else {
    return <Component {...pageProps} />;
  }
};

export default function App({ Component, pageProps }: AppProps) {
  addLocale('fr', primeLocaleFr);
  locale('fr');

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeWrapper>
        <GlobalStyle />
        <AppContextWrapper>
          <Layout Component={Component} pageProps={pageProps} />
          <DynToast />
          <DynConfirmDialog />
        </AppContextWrapper>
      </ThemeWrapper>
    </QueryClientProvider>
  );
}
