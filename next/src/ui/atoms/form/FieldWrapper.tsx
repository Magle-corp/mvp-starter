import styled from 'styled-components';

export default styled.div<{ direction: 'row' | 'column' }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
`;
