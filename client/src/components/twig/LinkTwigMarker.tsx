import { VIEW_RADIUS } from "../../constants";
import { selectFrame, selectTxIdToArrow } from "../../redux/slices/arrowSlice";
import { useAppSelector } from "../../redux/store";
import { getPolylineCoords } from "../../utils";
import { Twig } from "../../warp/arrow/types";

interface LinkTwigMarkerProps {
  i: number;
  twig: Twig;
}
const LinkTwigMarker = ({i, twig}: LinkTwigMarkerProps) => {
  const frame = useAppSelector(selectFrame);
  const txIdToArrow = useAppSelector(selectTxIdToArrow);

  if (!frame || !twig.detailAddress || twig.sourceTwigI === null || twig.targetTwigI === null) return null;

  const link = txIdToArrow[twig.detailAddress];

  if (!link) return null;

  const sourceTwig = frame.state.twigs[twig.sourceTwigI];
  const targetTwig = frame.state.twigs[twig.targetTwigI];

  const isSelected = frame.focusI === i;

  const handleClick = () => {
    console.log('click');
  }
  const handleMouseDown = () => {
    console.log('mousedown');
  }
  return (
    <g onClick={handleClick} onMouseDown={handleMouseDown} style={{
      cursor: 'pointer',
      zIndex: frame.state.twigIs.indexOf(i),
    }}>
      <polyline 
        points={getPolylineCoords(
          10 + (20 * (isSelected ? 2 : 1)),
          sourceTwig.x + VIEW_RADIUS,
          sourceTwig.y + VIEW_RADIUS,
          targetTwig.x + VIEW_RADIUS,
          targetTwig.y + VIEW_RADIUS,
        )}
        strokeWidth={1 + (isSelected ? 1 : 0) + 1}
        markerMid={`url(#marker-${link.state.color})`}
        markerEnd={`url(#marker-${link.state.color})`}
      />
      <line 
        onClick={handleClick}
        style={{
          cursor: 'pointer',
          opacity: isSelected 
            ? .5
            : .3,
        }}
        x1={sourceTwig.x + VIEW_RADIUS}
        y1={sourceTwig.y + VIEW_RADIUS}
        x2={targetTwig.x + VIEW_RADIUS}
        y2={targetTwig.y + VIEW_RADIUS}
        strokeWidth={10 * ((isSelected ? 2 : 1) + 1)}
        stroke={link.state.color}
        strokeLinecap={'round'}
      />
    </g>
  );
}

export default LinkTwigMarker;