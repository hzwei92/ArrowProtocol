import { mergeArrows, selectFrame } from "../redux/slices/arrowSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

interface MoveTwigProps {
  twigI: number;
  dx: number;
  dy: number;
}
const useMoveTwig = () => {
  const dispatch = useAppDispatch();
  const frame = useAppSelector(selectFrame);

  const moveTwig = ({ twigI, dx, dy }: MoveTwigProps) => {
    if (!frame) return;

    const twigs = frame.state.twigs.map((twig, i) => {
      if (Object.keys(frame.twigIToDescIToTrue[twigI] ?? {}).includes(i.toString())) {
        return {
          ...twig,
          x: twig.x + dx,
          y: twig.y + dy,
        };
      }
      return twig;
    });

    let isDirty = true;

    while (isDirty) {
      isDirty = false;
      
      twigs.forEach((t, i) => {
        if (
          t.sourceTwigI === null || 
          t.targetTwigI === null || 
          t.sourceTwigI === t.targetTwigI
        ) return;

        const source = twigs[t.sourceTwigI];
        const target = twigs[t.targetTwigI];

        const x = Math.round((source.x + target.x) / 2);
        const y = Math.round((source.y + target.y) / 2);

        if (t.x !== x || t.y !== y) {
          isDirty = true;
          twigs[i] = {
            ...t,
            x,
            y,
          };
        }
      });
    }

    dispatch(mergeArrows([{
      ...frame,
      state: {
        ...frame.state,
        twigs,
      }
    }]))
  }

  return moveTwig;
}

export default useMoveTwig;