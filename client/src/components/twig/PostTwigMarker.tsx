import { VIEW_RADIUS } from "../../constants";
import { selectFrame } from "../../redux/slices/arrowSlice";
import { useAppSelector } from "../../redux/store";
import { Twig } from "../../warp/arrow/types";

interface PostTwigMarkerProps {
  i: number;
  twig: Twig;
}
const PostTwigMarker = ({ i, twig }: PostTwigMarkerProps) => {
  const frame = useAppSelector(selectFrame);

  if (!frame || twig.parentTwigI === null) return null;

  const parentTwig = frame.state.twigs[twig.parentTwigI];

  return (
    <line 
      x1={parentTwig.x + VIEW_RADIUS}
      y1={parentTwig.y + VIEW_RADIUS}
      x2={twig.x + VIEW_RADIUS}
      y2={twig.y + VIEW_RADIUS}
      stroke={true //palette === 'dark' 
        ? 'white' 
        : 'black'}
      strokeLinecap={'round'}
      strokeWidth={5}
    />
  );
}

export default PostTwigMarker;