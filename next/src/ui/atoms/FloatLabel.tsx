import { ReactNode } from 'react';

type FloatLabel = {
  children: ReactNode;
  htmlFor: string;
  label: string;
};

const FloatLabel = ({ ...props }: FloatLabel) => {
  return (
    <span className="p-float-label">
      {props.children}
      <label htmlFor={props.htmlFor}>{props.label}</label>
    </span>
  );
};

export default FloatLabel;
