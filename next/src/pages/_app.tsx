import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { addLocale, locale } from 'primereact/api';
import primeLocaleFr from '@/cdn/i18n/primeLocaleFr.json';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { GlobalStyle, ThemeWrapper } from '@/theme';

export default function App({ Component, pageProps }: AppProps) {
  addLocale('fr', primeLocaleFr);
  locale('fr');

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeWrapper>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeWrapper>
    </QueryClientProvider>
  );
}
