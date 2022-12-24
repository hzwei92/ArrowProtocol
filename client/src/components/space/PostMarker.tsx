import { useContext } from "react";
import { VIEW_RADIUS } from "../../constants";
import { selectFrame } from "../../redux/slices/arrowSlice";
import { useAppSelector } from "../../redux/store";
import { Comment } from "../../warp/arrow/types";
import { AppContext } from "../app/AppProvider";

interface PostMarkerProps {
  i: number;
  comment: Comment;
}
const PostMarker = ({ i, comment }: PostMarkerProps) => {
  const { isDarkMode } = useContext(AppContext);

  const frame = useAppSelector(selectFrame);

  if (!frame || comment.parentCommentI === null) return null;

  const parentComment = frame.state.comments[comment.parentCommentI];

  return (
    <line 
      x1={parentComment.x + VIEW_RADIUS}
      y1={parentComment.y + VIEW_RADIUS}
      x2={comment.x + VIEW_RADIUS}
      y2={comment.y + VIEW_RADIUS}
      stroke={isDarkMode
        ? 'white' 
        : 'black'}
      strokeLinecap={'round'}
      strokeWidth={5}
    />
  );
}

export default PostMarker;