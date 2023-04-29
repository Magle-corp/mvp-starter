import styled, { css } from 'styled-components';
import { Button } from 'primereact/button';
import Colors from '@/theme/colors';

type ButtonVariant = 'danger';

export default styled(Button)<{ variant?: ButtonVariant }>`
  ${({ variant }) => getVariant(variant)};
  max-width: max-content;
`;

const getVariant = (variant?: ButtonVariant) => {
  let variantColor: string;

  switch (variant) {
    case 'danger':
      variantColor = Colors.error;
      break;
    default:
      variantColor = Colors.primary;
  }

  return css`
    background-color: ${variantColor};
    border: 1px solid ${variantColor};

    &:enabled:hover,
    &:enabled:active {
      background-color: ${variantColor};
      border: 1px solid ${variantColor};
    }

    &:focus {
      box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px ${variantColor},
        0 1px 2px 0 black;
    }
  `;
};
