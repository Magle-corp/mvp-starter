import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Card as PCard, CardProps } from 'primereact/card';

type Card = {
  title?: string;
  titleSize?: 'large';
  titlePosition?: 'center';
  children: ReactNode;
} & CardProps;

const Card = (props: Card) => {
  return (
    <StyledCard className={props.className}>
      <Section>
        {props.title && (
          <Title
            as="h2"
            titleSize={props.titleSize}
            titlePosition={props.titlePosition}
          >
            {props.title}
          </Title>
        )}
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
      variantPosition = 'center';
      break;
    default:
      variantPosition = 'left';
  }

  return css`
    font-size: ${variantSize};
    text-align: ${variantPosition};
  `;
};

export default Card;
