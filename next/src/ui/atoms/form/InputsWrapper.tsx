import styled from 'styled-components';

export default styled.fieldset<{ direction?: 'row' | 'column' }>`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : 'column')};
  gap: 3rem;
  width: 100%;
  border: unset;
`;
