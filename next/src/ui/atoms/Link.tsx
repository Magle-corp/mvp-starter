import { HTMLProps } from 'react';
import NextLink, { LinkProps } from 'next/link';
import styled from 'styled-components';

type Link = HTMLProps<HTMLAnchorElement> & LinkProps;

const Link = (props: Link) => {
  return (
    <StyledLink href={props.href} className={props.className}>
      {props.children}
    </StyledLink>
  );
};

const StyledLink = styled(NextLink)`
  position: relative;
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-bottom: unset;

    &:before,
    &:after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      border-bottom: 1px solid ${({ theme }) => theme.colors.black};
    }

    &:before {
      width: 0;
      transition: 500ms;
    }

    &:after {
      width: 100%;
    }

    &:hover {
      &:before {
        width: 100%;
      }

      &:after {
        width: 0;
      }
    }
  }
`;

export default Link;
