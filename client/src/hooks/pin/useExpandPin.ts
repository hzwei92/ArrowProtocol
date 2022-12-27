import { mergeArrows, selectFrame } from "../../redux/slices/arrowSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import useWritePins from "../../warp/arrow/actions/write/useWritePins";
import { Pin } from "../../warp/arrow/types";

interface ExpandPinProps {
  i: number;
  isExpanded: boolean;
}
const useExpandPin = () => {
  const dispatch = useAppDispatch();
  const frame = useAppSelector(selectFrame);

  const writePins = useWritePins();

  const expandPin = async ({ i, isExpanded }: ExpandPinProps) => {
    if (!frame) return;

    const pin = frame.state.pins[i];

    if (!pin) return;

    const pin1: Pin = {
      ...pin,
      isExpanded,
    };

    const pins = [...frame.state.pins];
    pins.splice(i, 1, pin1);

    dispatch(mergeArrows([{
      ...frame,
      state: {
        ...frame.state,
        pins,
      }
    }]));

    await writePins({ pins });
  }

  return expandPin;
}

export default useExpandPin;