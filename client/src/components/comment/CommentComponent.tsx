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
    if (comment.detailAddress){
      const arrow = txIdToArrow[comment.detailAddress];
      if (!arrow) {
        readArrowState(comment.detailAddress);
      }
    }
  }, [comment.detailAddress]);

  let arrow;
  if (comment.detailAddress) {
    arrow = txIdToArrow[comment.detailAddress];
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
        arrow?.state.sourceAddress === arrow?.state.targetAddress
          ? <PostComment i={i} comment={comment} arrow={arrow}/>
          : <LinkComment i={i} comment={comment} arrow={arrow}/>
      }
    </div>
  )
}

export default CommentComponent