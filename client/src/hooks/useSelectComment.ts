import { useIonRouter } from "@ionic/react";
import { useContext } from "react";
import { mergeArrows, selectFrame } from "../redux/slices/arrowSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { AppContext } from '../components/app/AppProvider';
import signer from "../wallet/signer";
import useWriteCommentIs from "../warp/arrow/actions/write/useWriteCommentIs";
interface SelectCommentProps {
  i: number;
}
const useSelectComment = () => {
  const dispatch = useAppDispatch();

  const router = useIonRouter();

  const frame = useAppSelector(selectFrame);

  const writeCommentIs = useWriteCommentIs();

  const selectComment = async ({ i }: SelectCommentProps) => {
    if (!frame) return;

    const topIs: number[] = [];
    const bottomIs: number[] = []  ;
    frame.state.commentIs.forEach((commentI) => {
      if (commentI === i) return;
      
      if (frame.commentIToDescIToTrue[i][commentI]) {
        topIs.push(commentI);
      }
      else {
        bottomIs.push(commentI);
      }
    });

    const commentIs = [...bottomIs, ...topIs, i];

    dispatch(mergeArrows([{
      ...frame,
      state: {
        ...frame.state,
        commentIs,
      }
    }]));

    router.push(`/j/${frame.txId}/${i}`);

    await writeCommentIs({ commentIs });
  }

  return selectComment;
}

export default useSelectComment;