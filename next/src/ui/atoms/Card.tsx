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
      <Section titleSize={props.titleSize}>
        {props.title && (
          <Title
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

const Section = styled.section<{ titleSize: Card['titleSize'] }>`
  ${({ titleSize }) => getSectionVariant(titleSize)};
  display: flex;
  flex-direction: column;
`;

const getSectionVariant = (titleSize?: Card['titleSize']) => {
  let variantGap: string;

  switch (titleSize) {
    case 'large':
      variantGap = '4rem';
      break;
    default:
      variantGap = '2rem';
  }

  return css`
    gap: ${variantGap};
  `;
};

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
