import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Positions } from '../../types/Types.ts';


function HoverTooltip({children, message, position=Positions.Top}) {
  return (
    <OverlayTrigger
      placement={position}
      delay={10}
      overlay={<Tooltip id="button-tooltip-2">{message}</Tooltip>}
    >
      {({ ref, ...triggerHandler }) => (
        children
      )}
    </OverlayTrigger>
  );
}

export default HoverTooltip;