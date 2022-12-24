import { useContext } from 'react';
import { AppContext } from '../../../../components/app/AppProvider';
import signer from '../../../../wallet/signer';

interface CreateCommentProps {
  abstractAddress: string;
  txId: string;
  parentCommentI: number | null;
  sourceCommentI: number | null;
  targetCommentI: number | null;
  x: number;
  y: number;
  date: number;
}
const useCreateComment = () => {
  const { warp } = useContext(AppContext);

  const createComment = async ({
    abstractAddress,
    txId,
    parentCommentI,
    sourceCommentI,
    targetCommentI,
    x,
    y,
    date,
  }: CreateCommentProps) => {
    if (!warp) return;

    const contract = await warp.contract(abstractAddress).connect({
      signer,
      type: 'arweave',
    })
    
    await contract.writeInteraction({
      function: 'createComment',
      txId,
      parentCommentI,
      sourceCommentI,
      targetCommentI,
      x,
      y,
      date,
    })
  }

  return createComment;
}

export default useCreateComment;