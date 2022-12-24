import { useIonRouter } from "@ionic/react";
import { useContext } from "react";
import { mergeArrows, selectFrame } from "../redux/slices/arrowSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { AppContext } from '../components/app/AppProvider';
import signer from "../wallet/signer";
import useWriteComments from "../warp/arrow/actions/write/useWriteComments";
import { Comment } from "../warp/arrow/types";
interface ExpandCommentProps {
  i: number;
  isExpanded: boolean;
}
const useExpandComment = () => {
  const dispatch = useAppDispatch();
  const frame = useAppSelector(selectFrame);

  const writeComments = useWriteComments();

  const expandComment = async ({ i, isExpanded }: ExpandCommentProps) => {
    if (!frame) return;

    const comment = frame.state.comments[i];

    if (!comment) return;

    const comment1: Comment = {
      ...comment,
      isExpanded,
    };

    const comments = [...frame.state.comments];
    comments.splice(i, 1, comment1);

    dispatch(mergeArrows([{
      ...frame,
      state: {
        ...frame.state,
        comments,
      }
    }]));

    await writeComments({ comments });
  }

  return expandComment;
}

export default useExpandComment;