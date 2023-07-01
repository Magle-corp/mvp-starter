import { HTMLProps } from 'react';
import NextLink, { LinkProps } from 'next/link';
import styled, { css } from 'styled-components';
import Colors from '@/theme/colors';

type LinkButton = {
  variant?: 'danger';
  icon?: string;
  target?: '_blank';
} & HTMLProps<HTMLAnchorElement> &
  LinkProps;

const LinkButton = (props: LinkButton) => {
  const LinkContent = () => (
    <>
      {props.icon && (
        <span
          className={
            'p-button-icon p-c' +
            (props.icon ? ' ' + props.icon : '') +
            (props.label && props.icon ? ' ' + 'p-button-icon-left' : '')
          }
        />
      )}
      {props.label && <span className="p-button-label p-c">{props.label}</span>}
    </>
  );

  return (
    <StyledNextLinkButton
      href={props.href}
      className={props.className ?? '' + 'p-button p-component p-button-sm'}
      variant={props.variant}
      target={props.target}
    >
      <LinkContent />
    </StyledNextLinkButton>
  );
};

const StyledNextLinkButton = styled(NextLink)<{
  variant?: LinkButton['variant'];
}>`
  ${({ variant }) => getVariant(variant)};
  text-decoration: none;
`;

const getVariant = (variant?: LinkButton['variant']) => {
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

export default LinkButton;
