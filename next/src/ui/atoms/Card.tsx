import { ReactNode } from 'react';
import styled from 'styled-components';
import { Card as PCard, CardProps } from 'primereact/card';

type Card = {
  title: string;
  description?: ReactNode;
  toolbar?: ReactNode;
  children: ReactNode;
} & CardProps;

const Card = (props: Card) => {
  return (
    <StyledCard className={props.className}>
      <Section>
        <Header>
          <TitleWrapper>
            <Title>{props.title}</Title>
            {props.description && <>{props.description}</>}
          </TitleWrapper>
          {props.toolbar && (
            <ToolBar>
              <div>{props.toolbar}</div>
            </ToolBar>
          )}
        </Header>
        {props.children}
      </Section>
    </StyledCard>
  );
};

const StyledCard = styled(PCard)`
  width: 100%;
  height: max-content;
  border-radius: 3px;

  .p-card-content {
    padding: 1rem 0;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h2`
  font-weight: 700;
  line-height: 1.25;
`;

const ToolBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: auto;
`;

export default Card;
