import { useContext } from "react";
import { v4 } from "uuid";
import { AppContext } from "../components/app/AppProvider";
import { useAppSelector } from "../redux/store";
import { Comment } from "../warp/arrow/types";
import { selectFrameTxId } from "../redux/slices/arrowSlice";
import useDeployArrow from "../warp/arrow/actions/write/useDeployArrow";
import useCreateComment from "../warp/arrow/actions/write/useCreateComment";
import useReadArrowState from "../warp/arrow/actions/read/useReadArrowState";
import { Arrow } from "../types";

interface ReplyCommentProps {
  i: number;
  comment: Comment;
  arrow: Arrow;
}
const useReplyComment = () => {
  const { walletAddress, profile } = useContext(AppContext);
  const frameTxId = useAppSelector(selectFrameTxId);

  const deployArrow = useDeployArrow();
  const createComment = useCreateComment();
  const readArrowState = useReadArrowState();

  const replyComment = async ({ i, comment, arrow }: ReplyCommentProps) => {
    if (!walletAddress || !profile || !frameTxId) return;
    const postTxId = await deployArrow({
      walletAddress,
      uuid: v4(),
      name: '',
      description: '',
      color: profile.color,
      data: '',
      parentAddress: frameTxId,
      sourceTxId: null,
      targetTxId: null,
      date: Date.now(),
    });

    if (!postTxId) {
      throw Error('Failed to deploy post arrow');
    };

    const dx = Math.round(comment.x) || (Math.random() - 0.5);
    const dy = Math.round(comment.y) || (Math.random() - 0.5);
    const dr = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    const x = Math.round((300 * dx / dr) + comment.x + (100 * Math.random() - 50));
    const y = Math.round((300 * dy / dr) + comment.y + (100 * Math.random() - 50));

    await createComment({
      abstractAddress: frameTxId,
      txId: postTxId,
      parentCommentI: i,
      sourceCommentI: null,
      targetCommentI: null,
      x,
      y,
      date: Date.now(),
    });


    const linkTxId = await deployArrow({
      walletAddress,
      uuid: v4(),
      name: '',
      description: '',
      data: '',
      color: profile.color,
      parentAddress: frameTxId,
      sourceTxId: arrow.txId,
      targetTxId: postTxId,
      date: Date.now(),
    });

    if (!linkTxId) {
      throw Error('Failed to deploy link arrow');
    };

    const frame1 = await readArrowState(frameTxId);

    if (!frame1) {
      throw Error('Failed to read frame arrow');
    };

    let targetCommentI: number | null = null;
    frame1.state.comments.slice().reverse().some((t, i) => {
      if (t.txId === postTxId) {
        targetCommentI = frame1.state.comments.length - 1 - i;
        return true;
      }
      return false;
    });

    await createComment({
      abstractAddress: frameTxId,
      txId: linkTxId,
      parentCommentI: null,
      sourceCommentI: i,
      targetCommentI,
      x: (comment.x + x) / 2,
      y: (comment.y + y) / 2,
      date: Date.now(),
    });

    await readArrowState(frameTxId);
  }

  return replyComment;
}

export default useReplyComment;