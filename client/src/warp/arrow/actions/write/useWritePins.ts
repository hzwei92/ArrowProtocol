import { useContext } from "react";
import { AppContext } from "../../../../components/app/AppProvider";
import { selectFrame } from "../../../../redux/slices/arrowSlice";
import { useAppSelector } from "../../../../redux/store";
import signer from "../../../../wallet/signer";
import { Pin } from "../../types";


interface WritePinsProps {
  pins: Pin[];
}

const useWritePins = () => {
  const { warp } = useContext(AppContext);
  const frame = useAppSelector(selectFrame);

  const writePins = async ({ pins }: WritePinsProps) => {
    if (!warp || !frame) return;

    const contract = await warp.contract(frame.txId).connect({
      signer,
      type: 'arweave',
    });

    await contract.writeInteraction({
      function: 'writePins',
      pins,
    });
  }
  return writePins;
}

export default useWritePins;