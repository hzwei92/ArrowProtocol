import { useContext } from "react";
import { v4 } from "uuid";
import { AppContext } from "../components/app/AppProvider";
import { selectFrame } from "../redux/slices/arrowSlice";
import { useAppSelector } from "../redux/store";
import useReadArrowState from "../warp/arrow/actions/read/useReadArrowState";
import useCreateComment from "../warp/arrow/actions/write/useCreateComment";
import useDeployArrow from "../warp/arrow/actions/write/useDeployArrow";

interface LinkCommentsProps {
  sourceCommentI: number;
  targetCommentI: number;
}

const useLinkComments = () => {
  const { walletAddress, profile } = useContext(AppContext);
  const frame = useAppSelector(selectFrame);

  const deployArrow = useDeployArrow();
  const createComment = useCreateComment();
  const readArrowState = useReadArrowState();

  const linkComments = async ({ sourceCommentI, targetCommentI }: LinkCommentsProps) => {
    if (!walletAddress || !profile || !frame) return;

    const sourceComment = frame.state.comments[sourceCommentI];
    const targetComment = frame.state.comments[targetCommentI];

    const linkTxId = await deployArrow({
      walletAddress,
      uuid: v4(),
      name: '',
      description: '',
      color: profile.color,
      data: '',
      parentTxId: frame.txId,
      sourceTxId: sourceComment.txId,
      targetTxId: targetComment.txId,
      date: Date.now(),
    });

    if (!linkTxId) {
      throw Error('Failed to deploy link arrow');
    };

    await createComment({
      abstractAddress: frame.txId,
      txId: linkTxId,
      parentCommentI: null,
      sourceCommentI,
      targetCommentI,
      x: (sourceComment.x + targetComment.x) / 2,
      y: (sourceComment.y + targetComment.y) / 2,
      date: Date.now(),
    });

    await readArrowState(frame.txId);
  }

  return linkComments;
}

export default useLinkComments;