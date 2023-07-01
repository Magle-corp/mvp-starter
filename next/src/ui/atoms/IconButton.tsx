import { ReactNode } from 'react';
import styled from 'styled-components';
import { Tooltip } from 'primereact/tooltip';
import getButtonVariant, { ButtonVariant } from '@/theme/getButtonVariant';

type IconButton = {
  children: ReactNode;
  variant?: ButtonVariant;
  behaviour: 'button' | 'link';
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
        variant={props.variant}
        as={props.behaviour === 'link' && props.href ? 'a' : 'button'}
        href={props.behaviour === 'link' && props.href ? props.href : undefined}
        target={props.behaviour === 'link' && props.href ? '_blank' : undefined}
        className={props.tooltip ? 'tooltip_' + tooltipClassTarget : undefined}
        onClick={() =>
          props.behaviour === 'button' && props.onClick
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

const StyledButton = styled.button<{ variant?: ButtonVariant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  height: max-content;
  padding: 5px;
  font-size: 20px;
  border-radius: 50%;
  cursor: pointer;
  ${({ variant }) => getButtonVariant(variant)}
`;

const ScreenReaderAlt = styled.p`
  display: none;
`;

export default IconButton;
