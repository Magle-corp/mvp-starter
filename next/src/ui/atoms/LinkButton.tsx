import { HTMLProps } from 'react';
import NextLink, { LinkProps } from 'next/link';
import styled from 'styled-components';
import getButtonVariant, { ButtonVariant } from '@/theme/getButtonVariant';

type LinkButton = {
  variant?: ButtonVariant;
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
  ${({ variant }) => getButtonVariant(variant)};
  text-decoration: none;
`;

export default LinkButton;
