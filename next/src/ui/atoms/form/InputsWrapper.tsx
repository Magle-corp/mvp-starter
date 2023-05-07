import styled, { css } from 'styled-components';
import useBreakpoints from '@/cdn/hooks/useBreakpoints';

export default styled.fieldset<{
  organizationMenuOpen?: boolean;
}>`
  display: grid;
  grid-template-columns: 1fr;
  margin: -1.5rem;
  border: unset;

  > * {
    padding: 1.5rem;
  }

  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(11, 9.09%);
  }

  ${({ organizationMenuOpen }) => getGridLayout(organizationMenuOpen)};
`;

const getGridLayout = (organizationMenuOpen?: boolean) => {
  const { breakpointMD, breakpointLG } = useBreakpoints();

  if (breakpointMD && organizationMenuOpen && !breakpointLG) {
    return css`
      grid-template-columns: 1fr !important;

      > * {
        grid-column: 1/2 !important;
      }
    `;
  }

  return '';
};
