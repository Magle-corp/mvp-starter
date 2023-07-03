import styled from 'styled-components';
import menuOrganization from '@/cdn/conf/menuOrganization';
import Menu from '@/ui/atoms/Menu';

const BackOfficeMenuLeft = () => {
  return <StyledMenu model={menuOrganization} />;
};

const StyledMenu = styled(Menu)`
  position: absolute;
  z-index: 1000;
  width: 100%;

  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    position: relative;
    width: max-content;
    min-height: 90vh;

    > ul > li > a {
      padding: 0.75rem 2rem 0.75rem 1.25rem !important;
    }
  }
`;

export default BackOfficeMenuLeft;
