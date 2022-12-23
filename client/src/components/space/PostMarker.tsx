import { useContext } from "react";
import { VIEW_RADIUS } from "../../constants";
import { selectFrame } from "../../redux/slices/arrowSlice";
import { useAppSelector } from "../../redux/store";
import { Twig } from "../../warp/arrow/types";
import { AppContext } from "../app/AppProvider";

interface PostMarkerProps {
  i: number;
  twig: Twig;
}
const PostMarker = ({ i, twig }: PostMarkerProps) => {
  const { isDarkMode } = useContext(AppContext);

  const frame = useAppSelector(selectFrame);

  if (!frame || twig.parentTwigI === null) return null;

  const parentTwig = frame.state.twigs[twig.parentTwigI];

  return (
    <line 
      x1={parentTwig.x + VIEW_RADIUS}
      y1={parentTwig.y + VIEW_RADIUS}
      x2={twig.x + VIEW_RADIUS}
      y2={twig.y + VIEW_RADIUS}
      stroke={isDarkMode
        ? 'white' 
        : 'black'}
      strokeLinecap={'round'}
      strokeWidth={5}
    />
  );
}

export default PostMarker;