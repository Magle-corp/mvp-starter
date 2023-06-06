import { ReactNode } from 'react';
import styled from 'styled-components';

type FloatLabel = {
  className?: string;
  children: ReactNode;
  htmlFor: string;
  label: string;
};

const FloatLabel = ({ ...props }: FloatLabel) => {
  return (
    <StyledSpan className={props.className + ' p-float-label'}>
      {props.children}
      <label htmlFor={props.htmlFor}>{props.label}</label>
    </StyledSpan>
  );
};

const StyledSpan = styled.span`
  width: 100%;
`;

export default FloatLabel;
