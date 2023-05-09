import { ReactNode } from 'react';
import styled from 'styled-components';
import useBreakpoints from '@/cdn/hooks/useBreakpoints';

type InputsWrapper = {
  organizationMenuOpen?: boolean;
  children: ReactNode;
  className?: string;
};

const InputsWrapper = (props: InputsWrapper) => {
  const { breakpointMD, breakpointLG } = useBreakpoints();

  if (breakpointMD && props.organizationMenuOpen && !breakpointLG) {
    return (
      <BackOfficeFieldSet className={props.className}>
        {props.children}
      </BackOfficeFieldSet>
    );
  }

  return <Fieldset className={props.className}>{props.children}</Fieldset>;
};

const Fieldset = styled.fieldset`
  display: grid;
  grid-template-columns: 1fr;
  margin: -1.5rem;
  border: unset;

  > * {
    padding: 1.5rem;
  }

  @media screen and (${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(11, 9.09%);
  }
`;

const BackOfficeFieldSet = styled(Fieldset)`
  grid-template-columns: 1fr !important;

  > * {
    grid-column: 1/2 !important;
  }
`;

export default InputsWrapper;
