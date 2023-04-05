import { ReactNode } from 'react';
import styled from 'styled-components';

type LinksWrapper = {
  children: ReactNode;
};

const LinksWrapper = (props: LinksWrapper) => {
  return <Wrapper>{props.children}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  a {
    font-weight: 600;
  }
`;

export default LinksWrapper;
