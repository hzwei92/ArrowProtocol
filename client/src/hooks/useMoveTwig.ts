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

    dispatch(mergeArrows([{
      ...frame,
      state: {
        ...frame.state,
        twigs: frame.state.twigs.map((twig, i) => {
          if (Object.keys(frame.twigIToDescIToTrue[twigI] ?? {}).includes(i.toString())) {
            return {
              ...twig,
              x: twig.x + dx,
              y: twig.y + dy,
            };
          }
          return twig;
        }),
      }
    }]))
  }

  return moveTwig;
}

export default useMoveTwig;