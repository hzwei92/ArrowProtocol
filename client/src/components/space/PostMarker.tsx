import { useContext } from "react";
import { VIEW_RADIUS } from "../../constants";
import { selectFrame } from "../../redux/slices/arrowSlice";
import { useAppSelector } from "../../redux/store";
import { Pin } from "../../warp/arrow/types";
import { AppContext } from "../app/AppProvider";

interface PostMarkerProps {
  i: number;
  pin: Pin;
}
const PostMarker = ({ i, pin }: PostMarkerProps) => {
  const { isDarkMode } = useContext(AppContext);

  const frame = useAppSelector(selectFrame);

  if (!frame || pin.parentPinI === null) return null;

  const parentPin = frame.state.pins[pin.parentPinI];

  return (
    <line 
      x1={parentPin.x + VIEW_RADIUS}
      y1={parentPin.y + VIEW_RADIUS}
      x2={pin.x + VIEW_RADIUS}
      y2={pin.y + VIEW_RADIUS}
      stroke={isDarkMode
        ? 'white' 
        : 'black'}
      strokeLinecap={'round'}
      strokeWidth={5}
    />
  );
}

export default PostMarker;