
import { VIEW_RADIUS } from '../../constants';
import { selectFrame } from '../../redux/slices/arrowSlice';
import { useAppSelector } from '../../redux/store';
import { Twig } from '../../warp/arrow/types';

interface TwigMarkerProps {
  i: number;
  twig: Twig;
};

const TwigMarker = ({ i, twig }: TwigMarkerProps) => {
  const frame = useAppSelector(selectFrame);

  if (twig.parentTwigI === null || !frame) return null;

  const parentTwig = frame.state.twigs[twig.parentTwigI];

  console.log(parentTwig);
  if (!parentTwig) return null;

  return (
    <line 
      x1={(parentTwig.x ?? 0) + VIEW_RADIUS}
      y1={(parentTwig.y ?? 0) + VIEW_RADIUS}
      x2={(twig.x ?? 0) + VIEW_RADIUS}
      y2={(twig.y ?? 0) + VIEW_RADIUS}
      stroke={true //palette === 'dark' 
        ? 'white' 
        : 'black'}
      strokeLinecap={'round'}
      strokeWidth={5}
    />
  );
}

export default TwigMarker;