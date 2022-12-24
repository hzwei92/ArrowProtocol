import { useEffect } from 'react';
import { VIEW_RADIUS } from '../../constants';
import { Comment } from '../../warp/arrow/types';
import { selectFrame, selectTxIdToArrow } from '../../redux/slices/arrowSlice';
import useReadArrowState from '../../warp/arrow/actions/read/useReadArrowState';
import LinkComment from './LinkComment';
import PostComment from './PostComment';
import { useAppSelector } from '../../redux/store';
import useSelectComment from '../../hooks/useSelectComment';

interface CommentProps {
  i: number;
  comment: Comment;
}

const CommentComponent = ({ i, comment }: CommentProps) => {
  const readArrowState = useReadArrowState();

  const txIdToArrow = useAppSelector(selectTxIdToArrow);
  const frame = useAppSelector(selectFrame);

  const isSelected = frame?.focusI === i;

  const selectComment = useSelectComment();

  useEffect(() => {
    if (comment.txId){
      const arrow = txIdToArrow[comment.txId];
      if (!arrow) {
        readArrowState(comment.txId);
      }
    }
  }, [comment.txId]);

  let arrow;
  if (comment.txId) {
    arrow = txIdToArrow[comment.txId];
  }
  else if (i === 0) {
    arrow = frame;
  }

  if (!arrow) return null;

  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!isSelected) {
      selectComment({ i });
    }
  }

  return (
    <div id={`comment-${i}`} 
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: VIEW_RADIUS + comment.x,
        top: VIEW_RADIUS + comment.y,
        zIndex: frame?.state.commentIs.indexOf(i),
      }}
    >
      {
        arrow?.state.sourceTxId === arrow?.state.targetTxId
          ? <PostComment i={i} comment={comment} arrow={arrow}/>
          : <LinkComment i={i} comment={comment} arrow={arrow}/>
      }
    </div>
  )
}

export default CommentComponent