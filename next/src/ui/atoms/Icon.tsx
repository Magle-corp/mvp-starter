import styled from 'styled-components';

export default styled.i<{ size: number; pointer: boolean }>`
  font-size: ${({ size }) => size + 'px'};
  cursor: ${({ pointer }) => (pointer ? 'pointer' : 'initial')};
`;
