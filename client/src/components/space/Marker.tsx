
import { Comment } from '../../warp/arrow/types';
import LinkMarker from './LinkMarker';
import PostMarker from './PostMarker';

interface MarkerProps {
  i: number;
  comment: Comment;
};

const Marker = ({ i, comment }: MarkerProps) => {
  if (comment.parentCommentI !== null) {
    return (
      <PostMarker i={i} comment={comment} />
    )
  }

  if (comment.sourceCommentI !== null && comment.targetCommentI !== null && comment.sourceCommentI !== comment.targetCommentI) {
    return (
      <LinkMarker i={i} comment={comment} />
    )
  }

  return null;
}

export default Marker;