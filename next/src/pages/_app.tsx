import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { addLocale, locale } from 'primereact/api';
import { ConfirmDialog } from 'primereact/confirmdialog';
import primeLocaleFr from '@/cdn/i18n/primeLocaleFr.json';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { GlobalStyle, ThemeWrapper } from '@/theme';

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
        <Layout Component={Component} pageProps={pageProps} />
        <ConfirmDialog />
      </ThemeWrapper>
    </QueryClientProvider>
  );
}
