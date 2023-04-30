import styled from 'styled-components';
import Card from '@/ui/atoms/Card';

export default styled(Card)`
  max-width: 360px;
  margin: 3rem auto 0;

  form {
    width: 90%;
    margin: 0 auto;

    p:first-child {
      text-align: center;
    }

    button {
      margin: 0 auto;
    }
  }
`;
