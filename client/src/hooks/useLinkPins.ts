import { useContext } from "react";
import { v4 } from "uuid";
import { AppContext } from "../components/app/AppProvider";
import { selectFrame } from "../redux/slices/arrowSlice";
import { useAppSelector } from "../redux/store";
import useReadArrowState from "../warp/arrow/actions/read/useReadArrowState";
import useCreatePin from "../warp/arrow/actions/write/useCreatePin";
import useDeployArrow from "../warp/arrow/actions/write/useDeployArrow";

interface LinksProps {
  sourcePinI: number;
  targetPinI: number;
}

const useLinkPins = () => {
  const { walletAddress, profile } = useContext(AppContext);
  const frame = useAppSelector(selectFrame);

  const deployArrow = useDeployArrow();
  const createPin = useCreatePin();
  const readArrowState = useReadArrowState();

  const linkPins = async ({ sourcePinI, targetPinI }: LinksProps) => {
    if (!walletAddress || !profile || !frame) return;

    const sourcePin = frame.state.pins[sourcePinI];
    const targetPin = frame.state.pins[targetPinI];

    const linkTxId = await deployArrow({
      walletAddress,
      uuid: v4(),
      text: '',
      draft: '',
      color: profile.color,
      data: '',
      parentTxId: frame.txId,
      sourceTxId: sourcePin.txId,
      targetTxId: targetPin.txId,
      date: Date.now(),
    });

    if (!linkTxId) {
      throw Error('Failed to deploy link arrow');
    };

    await createPin({
      abstractAddress: frame.txId,
      txId: linkTxId,
      parentPinI: null,
      sourcePinI,
      targetPinI,
      x: (sourcePin.x + targetPin.x) / 2,
      y: (sourcePin.y + targetPin.y) / 2,
      date: Date.now(),
    });

    await readArrowState(frame.txId);
  }

  return linkPins;
}

export default useLinkPins;