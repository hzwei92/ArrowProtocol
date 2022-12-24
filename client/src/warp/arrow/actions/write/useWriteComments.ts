import { useContext } from "react";
import { AppContext } from "../../../../components/app/AppProvider";
import { selectFrame } from "../../../../redux/slices/arrowSlice";
import { useAppSelector } from "../../../../redux/store";
import signer from "../../../../wallet/signer";

const useWriteComments = () => {
  const { warp } = useContext(AppContext);
  const frame = useAppSelector(selectFrame);

  const writeComments = async () => {
    if (!warp || !frame) return;

    const contract = await warp.contract(frame.txId).connect({
      signer,
      type: 'arweave',
    });

    await contract.writeInteraction({
      function: 'writeComments',
      comments: frame.state.comments,
    });
  }
  return writeComments;
}

export default useWriteComments;