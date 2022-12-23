import { useContext } from "react";
import { AppContext } from "../../../../components/app/AppProvider";
import { selectFrame } from "../../../../redux/slices/arrowSlice";
import { useAppSelector } from "../../../../redux/store";
import signer from "../../../../wallet/signer";

const useWriteTwigs = () => {
  const { warp } = useContext(AppContext);
  const frame = useAppSelector(selectFrame);

  const writeTwigs = async () => {
    if (!warp || !frame) return;

    const contract = await warp.contract(frame.txId).connect({
      signer,
      type: 'arweave',
    });

    await contract.writeInteraction({
      function: 'writeTwigs',
      twigs: frame.state.twigs,
    });
  }
  return writeTwigs;
}

export default useWriteTwigs;