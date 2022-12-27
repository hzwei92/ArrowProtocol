import { useContext } from "react";
import { AppContext } from "../../../../components/app/AppProvider";
import { selectFrame } from "../../../../redux/slices/arrowSlice";
import { useAppSelector } from "../../../../redux/store";
import signer from "../../../../wallet/signer";


interface WritePinIsProps {
  pinIs: number[];
}

const useWritePinIs = () => {
  const { warp } = useContext(AppContext);
  const frame = useAppSelector(selectFrame);

  const writePins = async ({ pinIs }: WritePinIsProps) => {
    if (!warp || !frame) return;

    const contract = await warp.contract(frame.txId).connect({
      signer,
      type: 'arweave',
    });

    await contract.writeInteraction({
      function: 'writePinIs',
      pinIs,
    });
  }
  return writePins;
}

export default useWritePinIs;