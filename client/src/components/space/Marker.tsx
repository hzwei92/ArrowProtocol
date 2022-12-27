
import { Pin } from '../../warp/arrow/types';
import LinkMarker from './LinkMarker';
import PostMarker from './PostMarker';

interface MarkerProps {
  i: number;
  pin: Pin;
};

const Marker = ({ i, pin }: MarkerProps) => {
  if (pin.parentPinI !== null) {
    return (
      <PostMarker i={i} pin={pin} />
    )
  }

  if (pin.sourcePinI !== null && pin.targetPinI !== null && pin.sourcePinI !== pin.targetPinI) {
    return (
      <LinkMarker i={i} pin={pin} />
    )
  }

  return null;
}

export default Marker;