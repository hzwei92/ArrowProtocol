import { useContext } from "react";
import { v4 } from "uuid";
import { AppContext } from "../../components/app/AppProvider";
import { useAppSelector } from "../../redux/store";
import { Pin } from "../../warp/arrow/types";
import { selectFrameTxId } from "../../redux/slices/arrowSlice";
import useDeployArrow from "../../warp/arrow/actions/write/useDeployArrow";
import useCreatePin from "../../warp/arrow/actions/write/useCreatePin";
import useReadArrowState from "../../warp/arrow/actions/read/useReadArrowState";
import { Arrow } from "../../types";

interface ReplyPinProps {
  i: number;
  pin: Pin;
  arrow: Arrow;
}
const useReplyPin = () => {
  const { walletAddress, profile } = useContext(AppContext);
  const frameTxId = useAppSelector(selectFrameTxId);

  const deployArrow = useDeployArrow();
  const createPin = useCreatePin();
  const readArrowState = useReadArrowState();

  const replyPin = async ({ i, pin, arrow }: ReplyPinProps) => {
    if (!walletAddress || !profile?.txId || !frameTxId) return;
    const postTxId = await deployArrow({
      walletAddress,
      profileTxId: profile.txId,
      uuid: v4(),
      text: '',
      draft: '',
      color: profile.state.color,
      data: '',
      parentTxId: frameTxId,
      sourceTxId: null,
      targetTxId: null,
      date: Date.now(),
    });

    if (!postTxId) {
      throw Error('Failed to deploy post arrow');
    };

    const dx = Math.round(pin.x) || (Math.random() - 0.5);
    const dy = Math.round(pin.y) || (Math.random() - 0.5);
    const dr = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    const x = Math.round((300 * dx / dr) + pin.x + (100 * Math.random() - 50));
    const y = Math.round((300 * dy / dr) + pin.y + (100 * Math.random() - 50));

    await createPin({
      abstractAddress: frameTxId,
      txId: postTxId,
      parentPinI: i,
      sourcePinI: null,
      targetPinI: null,
      x,
      y,
      date: Date.now(),
    });


    const linkTxId = await deployArrow({
      walletAddress,
      profileTxId: profile.txId,
      uuid: v4(),
      text: '',
      draft: '',
      data: '',
      color: profile.state.color,
      parentTxId: frameTxId,
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

    let targetPinI: number | null = null;
    frame1.state.pins.slice().reverse().some((t, i) => {
      if (t.txId === postTxId) {
        targetPinI = frame1.state.pins.length - 1 - i;
        return true;
      }
      return false;
    });

    await createPin({
      abstractAddress: frameTxId,
      txId: linkTxId,
      parentPinI: null,
      sourcePinI: i,
      targetPinI,
      x: (pin.x + x) / 2,
      y: (pin.y + y) / 2,
      date: Date.now(),
    });

    await readArrowState(frameTxId);
  }

  return replyPin;
}

export default useReplyPin;