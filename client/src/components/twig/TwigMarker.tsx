
import { Twig } from '../../warp/arrow/types';
import LinkTwigMarker from './LinkTwigMarker';
import PostTwigMarker from './PostTwigMarker';

interface TwigMarkerProps {
  i: number;
  twig: Twig;
};

const TwigMarker = ({ i, twig }: TwigMarkerProps) => {
  if (twig.parentTwigI !== null) {
    return (
      <PostTwigMarker i={i} twig={twig} />
    )
  }

  if (twig.sourceTwigI !== null && twig.targetTwigI !== null && twig.sourceTwigI !== twig.targetTwigI) {
    return (
      <LinkTwigMarker i={i} twig={twig} />
    )
  }

  return null;
}

export default TwigMarker;