import { useContext } from "react";
import { v4 } from "uuid";
import { AppContext } from "../components/app/AppProvider";
import { selectFrame } from "../redux/slices/arrowSlice";
import { useAppSelector } from "../redux/store";
import useReadArrowState from "../warp/arrow/actions/read/useReadArrowState";
import useCreateTwig from "../warp/arrow/actions/write/useCreateTwig";
import useDeployArrow from "../warp/arrow/actions/write/useDeployArrow";

interface LinkTwigsProps {
  sourceTwigI: number;
  targetTwigI: number;
}

const useLinkTwigs = () => {
  const { walletAddress, profile } = useContext(AppContext);
  const frame = useAppSelector(selectFrame);

  const deployArrow = useDeployArrow();
  const createTwig = useCreateTwig();
  const readArrowState = useReadArrowState();

  const linkTwigs = async ({ sourceTwigI, targetTwigI }: LinkTwigsProps) => {
    if (!walletAddress || !profile || !frame) return;

    const sourceTwig = frame.state.twigs[sourceTwigI];
    const targetTwig = frame.state.twigs[targetTwigI];

    const linkTxId = await deployArrow({
      walletAddress,
      uuid: v4(),
      name: '',
      description: '',
      color: profile.color,
      data: '',
      parentAddress: frame.txId,
      sourceAddress: sourceTwig.detailAddress,
      targetAddress: targetTwig.detailAddress,
      date: Date.now(),
    });

    if (!linkTxId) {
      throw Error('Failed to deploy link arrow');
    };

    await createTwig({
      abstractAddress: frame.txId,
      detailAddress: linkTxId,
      parentTwigI: null,
      sourceTwigI,
      targetTwigI,
      x: (sourceTwig.x + targetTwig.x) / 2,
      y: (sourceTwig.y + targetTwig.y) / 2,
      date: Date.now(),
    });

    await readArrowState(frame.txId);
  }

  return linkTwigs;
}

export default useLinkTwigs;