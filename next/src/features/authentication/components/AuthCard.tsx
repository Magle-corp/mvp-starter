import { ReactNode } from 'react';
import styled from 'styled-components';
import Card from '@/ui/atoms/Card';

type AuthCard = {
  children: ReactNode;
  title: string;
};

const AuthCard = (props: AuthCard) => {
  return (
    <StyledCard>
      <Section>
        <Title>{props.title}</Title>
        {props.children}
      </Section>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 360px;
  margin: 3rem auto 0;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.25;
  text-align: center;
`;

export default AuthCard;
