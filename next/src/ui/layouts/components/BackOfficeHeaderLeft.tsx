import styled from 'styled-components';

type BackOfficeHeaderLeft = {
  organizationName: string;
  organizationMenuOpen: boolean;
  setOrganizationMenuOpen: Function;
};

const BackOfficeHeaderLeft = (props: BackOfficeHeaderLeft) => (
  <Wrapper>
    <Icon
      className={props.organizationMenuOpen ? 'pi pi-times' : 'pi pi-bars'}
      onClick={() => props.setOrganizationMenuOpen(!props.organizationMenuOpen)}
    />
    <OrganizationName>{props.organizationName}</OrganizationName>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Icon = styled.i`
  font-size: 20px;
  cursor: pointer;
`;

const OrganizationName = styled.p`
  display: none;

  @media screen and (${({ theme }) => theme.breakpoints.sm}) {
    display: inline;
    font-weight: 700;
  }
`;

export default BackOfficeHeaderLeft;
