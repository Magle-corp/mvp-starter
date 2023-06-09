import styled, { css } from 'styled-components';
import { Button } from 'primereact/button';
import Colors from '@/theme/colors';

type ButtonVariant = 'danger' | 'warning' | 'success' | 'idle';

export default styled(Button)<{ variant?: ButtonVariant }>`
  ${({ variant }) => getVariant(variant)};
  max-width: max-content;
`;

const getVariant = (variant?: ButtonVariant) => {
  let variantColor: string;
  let contentColor: string;

  switch (variant) {
    case 'danger':
      variantColor = Colors.error;
      contentColor = Colors.white;
      break;
    case 'warning':
      variantColor = Colors.warning;
      contentColor = Colors.black;
      break;
    case 'success':
      variantColor = Colors.success;
      contentColor = Colors.white;
      break;
    case 'idle':
      variantColor = Colors.gray_light;
      contentColor = Colors.black;
      break;
    default:
      variantColor = Colors.primary;
      contentColor = Colors.white;
  }

  return css`
    background-color: ${variantColor};
    border: 1px solid ${variantColor};
    color: ${contentColor};

    &:enabled:hover,
    &:enabled:active {
      background-color: ${variantColor};
      border: 1px solid ${variantColor};
      color: ${contentColor};
    }

    &:focus {
      box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px ${variantColor},
        0 1px 2px 0 black;
    }
  `;
};
