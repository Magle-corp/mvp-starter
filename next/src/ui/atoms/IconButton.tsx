import { ReactNode } from 'react';
import styled from 'styled-components';
import { Tooltip } from 'primereact/tooltip';

type IconButton = {
  children: ReactNode;
  variant: 'button' | 'link';
  onClick?: Function;
  href?: string;
  accessAlt: string;
  tooltip?: string;
};

const IconButton = (props: IconButton) => {
  const tooltipClassTarget =
    props.tooltip && props.tooltip.replaceAll(' ', '_');

  return (
    <>
      <Tooltip
        target={props.tooltip ? '.tooltip_' + tooltipClassTarget : undefined}
        mouseTrack
        mouseTrackLeft={20}
      />
      <StyledButton
        as={props.variant === 'link' && props.href ? 'a' : 'button'}
        href={props.variant === 'link' && props.href ? props.href : undefined}
        target={props.variant === 'link' && props.href ? '_blank' : undefined}
        className={props.tooltip ? 'tooltip_' + tooltipClassTarget : undefined}
        onClick={() =>
          props.variant === 'button' && props.onClick
            ? props.onClick()
            : undefined
        }
        data-pr-tooltip={props.tooltip ?? undefined}
      >
        <>
          <ScreenReaderAlt>{props.accessAlt}</ScreenReaderAlt>
          {props.children}
        </>
      </StyledButton>
    </>
  );
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  height: max-content;
  padding: 5px;
  font-size: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  cursor: pointer;
  transition: 250ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.primary};

    svg {
      stroke: ${({ theme }) => theme.colors.primary};
    }
  }

  svg {
    stroke: ${({ theme }) => theme.colors.white};
    transition: 250ms;
  }
`;

const ScreenReaderAlt = styled.p`
  display: none;
`;

export default IconButton;
