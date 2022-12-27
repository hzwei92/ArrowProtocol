import { VIEW_RADIUS } from "../constants";
import { mergeArrows, selectFrame } from "../redux/slices/arrowSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

interface MovePinProps {
  pinI: number;
  dx: number;
  dy: number;
}
const useMovePin = () => {
  const dispatch = useAppDispatch();
  const frame = useAppSelector(selectFrame);

  const movePin = ({ pinI, dx, dy }: MovePinProps) => {
    if (!frame) return;

    const pins = frame.state.pins.map((pin, i) => {
      if (Object.keys(frame.pinIToDescIToTrue[pinI] ?? {}).includes(i.toString())) {
        return {
          ...pin,
          x: Math.max(Math.min(pin.x + dx, VIEW_RADIUS - 10), 10 - VIEW_RADIUS),
          y: Math.max(Math.min(pin.y + dy, VIEW_RADIUS - 10), 10 - VIEW_RADIUS),
        };
      }
      return pin;
    });

    let count = 0;
    let isDirty = true;

    while (isDirty && count < 100) {
      isDirty = false;
      
      pins.forEach((t, i) => {
        if (
          t.sourcePinI === null || 
          t.targetPinI === null || 
          t.sourcePinI === t.targetPinI
        ) return;

        const source = pins[t.sourcePinI];
        const target = pins[t.targetPinI];

        const x = Math.round((source.x + target.x) / 2);
        const y = Math.round((source.y + target.y) / 2);

        if (t.x !== x || t.y !== y) {
          isDirty = true;
          pins[i] = {
            ...t,
            x,
            y,
          };
        }
      });

      count++;
    }

    dispatch(mergeArrows([{
      ...frame,
      state: {
        ...frame.state,
        pins,
      }
    }]))
  }

  return movePin;
}

export default useMovePin;