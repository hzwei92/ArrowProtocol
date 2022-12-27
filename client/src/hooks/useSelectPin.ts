import { useIonRouter } from "@ionic/react";
import { useContext } from "react";
import { mergeArrows, selectFrame } from "../redux/slices/arrowSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { AppContext } from '../components/app/AppProvider';
import signer from "../wallet/signer";
import useWritePinIs from "../warp/arrow/actions/write/useWritePinIs";
interface SelectPinProps {
  i: number;
}
const useSelectPin = () => {
  const dispatch = useAppDispatch();

  const router = useIonRouter();

  const frame = useAppSelector(selectFrame);

  const writePinIs = useWritePinIs();

  const selectPin = async ({ i }: SelectPinProps) => {
    if (!frame) return;

    const topIs: number[] = [];
    const bottomIs: number[] = []  ;
    frame.state.pinIs.forEach((pinI) => {
      if (pinI === i) return;
      
      if (frame.pinIToDescIToTrue[i][pinI]) {
        topIs.push(pinI);
      }
      else {
        bottomIs.push(pinI);
      }
    });

    const pinIs = [...bottomIs, ...topIs, i];

    dispatch(mergeArrows([{
      ...frame,
      state: {
        ...frame.state,
        pinIs,
      }
    }]));

    router.push(`/j/${frame.txId}/${i}`);

    await writePinIs({ pinIs });
  }

  return selectPin;
}

export default useSelectPin;