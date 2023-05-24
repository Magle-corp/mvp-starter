import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Card as PCard, CardProps } from 'primereact/card';

type Card = {
  title?: string;
  titleSize?: 'large';
  titlePosition?: 'center';
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
            {props.title && (
              <Title
                as="h2"
                titleSize={props.titleSize}
                titlePosition={props.titlePosition}
              >
                {props.title}
              </Title>
            )}
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

const Title = styled.h1<{
  titleSize: Card['titleSize'];
  titlePosition: Card['titlePosition'];
}>`
  ${({ titleSize, titlePosition }) =>
    getTitleVariant(titleSize, titlePosition)};
  font-weight: 700;
  line-height: 1.25;
`;

const getTitleVariant = (
  titleSize?: Card['titleSize'],
  titlePosition?: Card['titlePosition']
) => {
  let variantWidth: string;
  let variantSize: string;
  let variantPosition: string;

  switch (titleSize) {
    case 'large':
      variantSize = '2.5rem';
      break;
    default:
      variantSize = '1.5rem';
  }

  switch (titlePosition) {
    case 'center':
      variantWidth = '100%';
      variantPosition = 'center';
      break;
    default:
      variantWidth = 'initial';
      variantPosition = 'left';
  }

  return css`
    width: ${variantWidth};
    font-size: ${variantSize};
    text-align: ${variantPosition};
  `;
};

const ToolBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: auto;
`;

export default Card;
