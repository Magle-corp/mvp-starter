import { ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import breakpoints from '@/theme/breakpoints';
import colors from '@/theme/colors';

type ThemeWrapper = {
  children: ReactNode;
};

const ThemeWrapper = ({ children }: ThemeWrapper) => {
  let theme = {
    breakpoints,
    colors,
  };

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
  }
    
  body {
    background-color: var(--surface-ground);
    font-family: var(--font-family);
    font-weight: normal;
    color: var(--text-color);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  main {
    padding: 0 10px;
  }
`;

export { GlobalStyle, ThemeWrapper };
