import { ReactNode } from 'react';
import styled from 'styled-components';

type CongratsWrapper = {
  children: ReactNode;
};

const CongratsWrapper = (props: CongratsWrapper) => {
  return <Wrapper>{props.children}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;

  p:first-child {
    font-weight: 600;
  }
`;

export default CongratsWrapper;
