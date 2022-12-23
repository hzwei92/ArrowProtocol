
import { Twig } from '../../warp/arrow/types';
import LinkMarker from './LinkMarker';
import PostMarker from './PostMarker';

interface MarkerProps {
  i: number;
  twig: Twig;
};

const Marker = ({ i, twig }: MarkerProps) => {
  if (twig.parentTwigI !== null) {
    return (
      <PostMarker i={i} twig={twig} />
    )
  }

  if (twig.sourceTwigI !== null && twig.targetTwigI !== null && twig.sourceTwigI !== twig.targetTwigI) {
    return (
      <LinkMarker i={i} twig={twig} />
    )
  }

  return null;
}

export default Marker;