import { MouseEvent } from "react";
import { VIEW_RADIUS } from "../../constants";
import useExpandPin from "../../hooks/pin/useExpandPin";
import useSelectPin from "../../hooks/pin/useSelectPin";
import { selectFrame, selectTxIdToArrow } from "../../redux/slices/arrowSlice";
import { useAppSelector } from "../../redux/store";
import { getPolylineCoords } from "../../utils";
import { Pin } from "../../warp/arrow/types";

interface LinkMarkerProps {
  i: number;
  pin: Pin;
}
const LinkMarker = ({i, pin}: LinkMarkerProps) => {
  const frame = useAppSelector(selectFrame);
  const txIdToArrow = useAppSelector(selectTxIdToArrow);

  const selectPin = useSelectPin();
  const expandPin = useExpandPin();

  if (!frame || !pin.txId || pin.sourcePinI === null || pin.targetPinI === null) return null;

  const link = txIdToArrow[pin.txId];

  if (!link) return null;

  const sourcePin = frame.state.pins[pin.sourcePinI];
  const targetPin = frame.state.pins[pin.targetPinI];

  const isSelected = frame.focusI === i;

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (!isSelected) {
      selectPin({ i });
    }
    if (!pin.isExpanded) {
      expandPin({ i, isExpanded: true });
    }
  }

  return (
    <g onClick={handleClick} style={{
      cursor: 'pointer',
      zIndex: frame.state.pinIs.indexOf(i),
    }}>
      <polyline 
        points={getPolylineCoords(
          10 + (20 * (isSelected ? 2 : 1)),
          sourcePin.x + VIEW_RADIUS,
          sourcePin.y + VIEW_RADIUS,
          targetPin.x + VIEW_RADIUS,
          targetPin.y + VIEW_RADIUS,
        )}
        strokeWidth={1 + (isSelected ? 1 : 0) + 1}
        markerMid={`url(#marker-${link.state.color})`}
        markerEnd={`url(#marker-${link.state.color})`}
      />
      <line 
        style={{
          cursor: 'pointer',
          opacity: isSelected 
            ? .5
            : .3,
        }}
        x1={sourcePin.x + VIEW_RADIUS}
        y1={sourcePin.y + VIEW_RADIUS}
        x2={targetPin.x + VIEW_RADIUS}
        y2={targetPin.y + VIEW_RADIUS}
        strokeWidth={10 * ((isSelected ? 2 : 1) + 1)}
        stroke={link.state.color}
        strokeLinecap={'round'}
      />
    </g>
  );
}

export default LinkMarker;