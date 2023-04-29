import styled from 'styled-components';
import AppPages from '@/cdn/enums/AppPages';
import Link from '@/ui/atoms/Link';
import Card from '@/ui/atoms/Card';

const ErrorGetOrganizationCard = () => {
  return (
    <StyledCard title="Oups..." titleSize="large" titlePosition="center">
      <ErrorWrapper>
        <p>Une erreur nous empêche de vous donner accès au back-office 🔌</p>
        <p>Veuillez nous excuser pour la gêne occasionnée</p>
      </ErrorWrapper>
      <LinksWrapper>
        <Link href={AppPages.AUTH_SIGN_IN}>Se connecter</Link>
      </LinksWrapper>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    width: 80%;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;

  p:first-child {
    font-weight: 600;
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  a {
    font-weight: 600;
  }
`;

export default ErrorGetOrganizationCard;
