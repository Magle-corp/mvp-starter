import { useEffect, useState } from 'react';
import Breakpoints from '@/theme/breakpoints';

const useMedia = (query: string) => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

const useBreakpoints = (): Record<
  'breakpointSM' | 'breakpointMD' | 'breakpointLG' | 'breakpointXL',
  boolean
> => {
  return {
    breakpointSM: useMedia(Breakpoints.sm),
    breakpointMD: useMedia(Breakpoints.md),
    breakpointLG: useMedia(Breakpoints.lg),
    breakpointXL: useMedia(Breakpoints.xl),
  };
};

export default useBreakpoints;
