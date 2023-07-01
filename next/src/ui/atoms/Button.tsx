import styled from 'styled-components';
import { Button } from 'primereact/button';
import getButtonVariant, { ButtonVariant } from '@/theme/getButtonVariant';

export default styled(Button)<{ variant?: ButtonVariant }>`
  ${({ variant }) => getButtonVariant(variant)};
  max-width: max-content;
`;
