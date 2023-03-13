import type { AppProps } from 'next/app';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
