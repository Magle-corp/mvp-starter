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
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  cursor: pointer;
`;

export default Link;
