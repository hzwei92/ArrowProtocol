import { VIEW_RADIUS } from "../constants";
import { mergeArrows, selectFrame } from "../redux/slices/arrowSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

interface MoveCommentProps {
  commentI: number;
  dx: number;
  dy: number;
}
const useMoveComment = () => {
  const dispatch = useAppDispatch();
  const frame = useAppSelector(selectFrame);

  const moveComment = ({ commentI, dx, dy }: MoveCommentProps) => {
    if (!frame) return;

    const comments = frame.state.comments.map((comment, i) => {
      if (Object.keys(frame.commentIToDescIToTrue[commentI] ?? {}).includes(i.toString())) {
        return {
          ...comment,
          x: Math.max(Math.min(comment.x + dx, VIEW_RADIUS - 10), 10 - VIEW_RADIUS),
          y: Math.max(Math.min(comment.y + dy, VIEW_RADIUS - 10), 10 - VIEW_RADIUS),
        };
      }
      return comment;
    });

    let count = 0;
    let isDirty = true;

    while (isDirty && count < 100) {
      isDirty = false;
      
      comments.forEach((t, i) => {
        if (
          t.sourceCommentI === null || 
          t.targetCommentI === null || 
          t.sourceCommentI === t.targetCommentI
        ) return;

        const source = comments[t.sourceCommentI];
        const target = comments[t.targetCommentI];

        const x = Math.round((source.x + target.x) / 2);
        const y = Math.round((source.y + target.y) / 2);

        if (t.x !== x || t.y !== y) {
          isDirty = true;
          comments[i] = {
            ...t,
            x,
            y,
          };
        }
      });

      count++;
    }

    dispatch(mergeArrows([{
      ...frame,
      state: {
        ...frame.state,
        comments,
      }
    }]))
  }

  return moveComment;
}

export default useMoveComment;