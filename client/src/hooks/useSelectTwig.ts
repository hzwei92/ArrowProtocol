import { useIonRouter } from "@ionic/react";
import { selectFrame } from "../redux/slices/arrowSlice";
import { useAppSelector } from "../redux/store";
import { Twig } from "../warp/arrow/types";

interface SelectTwigProps {
  i: number;
}
const useSelectTwig = () => {
  const router = useIonRouter();

  const frame = useAppSelector(selectFrame);

  const selectTwig = ({i}: SelectTwigProps) => {
    if (!frame) return;

    router.push(`/j/${frame.txId}/${i}`);
  }

  return selectTwig;
}

export default useSelectTwig;