import { useContext } from "react";
import { AppContext } from "../../../../components/app/AppProvider";
import { selectFrame } from "../../../../redux/slices/arrowSlice";
import { useAppSelector } from "../../../../redux/store";
import signer from "../../../../wallet/signer";


interface WriteCommentIsProps {
  commentIs: number[];
}

const useWriteCommentIs = () => {
  const { warp } = useContext(AppContext);
  const frame = useAppSelector(selectFrame);

  const writeComments = async ({ commentIs }: WriteCommentIsProps) => {
    if (!warp || !frame) return;

    const contract = await warp.contract(frame.txId).connect({
      signer,
      type: 'arweave',
    });

    await contract.writeInteraction({
      function: 'writeCommentIs',
      commentIs,
    });
  }
  return writeComments;
}

export default useWriteCommentIs;