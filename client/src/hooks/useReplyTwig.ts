import { useContext } from "react";
import { v4 } from "uuid";
import { AppContext } from "../components/app/AppProvider";
import { useAppSelector } from "../redux/store";
import { Twig } from "../warp/arrow/types";
import { selectFrameTxId } from "../redux/slices/arrowSlice";
import useDeployArrow from "../warp/arrow/actions/write/useDeployArrow";
import useCreateTwig from "../warp/arrow/actions/write/useCreateTwig";
import useReadArrowState from "../warp/arrow/actions/read/useReadArrowState";
import { Arrow } from "../types";

interface ReplyTwigProps {
  i: number;
  twig: Twig;
  arrow: Arrow;
}
const useReplyTwig = () => {
  const { walletAddress, profile } = useContext(AppContext);
  const frameTxId = useAppSelector(selectFrameTxId);

  const deployArrow = useDeployArrow();
  const createTwig = useCreateTwig();
  const readArrowState = useReadArrowState();

  const replyTwig = async ({ i, twig, arrow }: ReplyTwigProps) => {
    if (!walletAddress || !profile || !frameTxId) return;
    const postTxId = await deployArrow({
      walletAddress,
      uuid: v4(),
      name: '',
      description: '',
      color: profile.color,
      data: '',
      parentAddress: frameTxId,
      sourceAddress: null,
      targetAddress: null,
      date: Date.now(),
    });

    if (!postTxId) {
      throw Error('Failed to deploy post arrow');
    };

    const dx = Math.round(twig.x) || (Math.random() - 0.5);
    const dy = Math.round(twig.y) || (Math.random() - 0.5);
    const dr = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    const x = Math.round((300 * dx / dr) + twig.x + (100 * Math.random() - 50));
    const y = Math.round((300 * dy / dr) + twig.y + (100 * Math.random() - 50));

    await createTwig({
      abstractAddress: frameTxId,
      detailAddress: postTxId,
      parentTwigI: i,
      sourceTwigI: null,
      targetTwigI: null,
      x,
      y,
      date: Date.now(),
    });


    const linkTxId = await deployArrow({
      walletAddress,
      uuid: v4(),
      name: '',
      description: '',
      data: '',
      color: profile.color,
      parentAddress: frameTxId,
      sourceAddress: arrow.txId,
      targetAddress: postTxId,
      date: Date.now(),
    });

    if (!linkTxId) {
      throw Error('Failed to deploy link arrow');
    };

    const frame1 = await readArrowState(frameTxId);

    if (!frame1) {
      throw Error('Failed to read frame arrow');
    };

    let targetTwigI: number | null = null;
    frame1.state.twigs.slice().reverse().some((t, i) => {
      if (t.detailAddress === postTxId) {
        targetTwigI = frame1.state.twigs.length - 1 - i;
        return true;
      }
      return false;
    });

    await createTwig({
      abstractAddress: frameTxId,
      detailAddress: linkTxId,
      parentTwigI: null,
      sourceTwigI: i,
      targetTwigI,
      x: (twig.x + x) / 2,
      y: (twig.y + y) / 2,
      date: Date.now(),
    });

    await readArrowState(frameTxId);
  }

  return replyTwig;
}

export default useReplyTwig;