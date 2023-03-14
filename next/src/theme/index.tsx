import { ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

type ThemeWrapper = {
  children: ReactNode;
};

const ThemeWrapper = ({ children }: ThemeWrapper) => {
  let theme = {};

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
  }
    
  html {
    font-size: 1rem;
  }

  body {
    background-color: var(--surface-ground);
    font-family: var(--font-family);
    font-weight: normal;
    color: var(--text-color);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export { GlobalStyle, ThemeWrapper };
