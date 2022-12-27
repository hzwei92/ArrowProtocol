import { useContext } from "react";
import { AppContext } from "../../../../components/app/AppProvider";
import { selectFrame } from "../../../../redux/slices/arrowSlice";
import { useAppSelector } from "../../../../redux/store";
import signer from "../../../../wallet/signer";

interface WriteDraftAndTextProps {
  txId: string;
  draft: string;
  text: string;
  date: number;
}

const useWriteDraftAndText = () => {
  const { warp } = useContext(AppContext);
  const frame = useAppSelector(selectFrame);

  const writeDraftAndText = async ({ txId, draft, text, date }: WriteDraftAndTextProps) => {
    if (!warp || !frame) return;

    const contract = await warp.contract(txId).connect({
      signer,
      type: 'arweave',
    });

    await contract.writeInteraction({
      function: 'writeDraftAndText',
      draft,
      text,
      date,
    });
  }
  return writeDraftAndText;
}

export default useWriteDraftAndText;