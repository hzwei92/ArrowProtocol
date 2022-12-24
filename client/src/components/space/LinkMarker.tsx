import { MouseEvent } from "react";
import { VIEW_RADIUS } from "../../constants";
import useSelectComment from "../../hooks/useSelectComment";
import { selectFrame, selectTxIdToArrow } from "../../redux/slices/arrowSlice";
import { useAppSelector } from "../../redux/store";
import { getPolylineCoords } from "../../utils";
import { Comment } from "../../warp/arrow/types";

interface LinkMarkerProps {
  i: number;
  comment: Comment;
}
const LinkMarker = ({i, comment}: LinkMarkerProps) => {
  const frame = useAppSelector(selectFrame);
  const txIdToArrow = useAppSelector(selectTxIdToArrow);

  const selectComment = useSelectComment();

  if (!frame || !comment.detailAddress || comment.sourceCommentI === null || comment.targetCommentI === null) return null;

  const link = txIdToArrow[comment.detailAddress];

  if (!link) return null;

  const sourceComment = frame.state.comments[comment.sourceCommentI];
  const targetComment = frame.state.comments[comment.targetCommentI];

  const isSelected = frame.focusI === i;

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (!isSelected) {
      selectComment({ i });
    }
  }

  return (
    <g onClick={handleClick} style={{
      cursor: 'pointer',
      zIndex: frame.state.commentIs.indexOf(i),
    }}>
      <polyline 
        points={getPolylineCoords(
          10 + (20 * (isSelected ? 2 : 1)),
          sourceComment.x + VIEW_RADIUS,
          sourceComment.y + VIEW_RADIUS,
          targetComment.x + VIEW_RADIUS,
          targetComment.y + VIEW_RADIUS,
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
        x1={sourceComment.x + VIEW_RADIUS}
        y1={sourceComment.y + VIEW_RADIUS}
        x2={targetComment.x + VIEW_RADIUS}
        y2={targetComment.y + VIEW_RADIUS}
        strokeWidth={10 * ((isSelected ? 2 : 1) + 1)}
        stroke={link.state.color}
        strokeLinecap={'round'}
      />
    </g>
  );
}

export default LinkMarker;