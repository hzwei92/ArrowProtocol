import { useIonRouter } from "@ionic/react";
import { selectFrame } from "../redux/slices/arrowSlice";
import { useAppSelector } from "../redux/store";
import { Comment } from "../warp/arrow/types";

interface SelectCommentProps {
  i: number;
}
const useSelectComment = () => {
  const router = useIonRouter();

  const frame = useAppSelector(selectFrame);

  const selectComment = ({i}: SelectCommentProps) => {
    if (!frame) return;

    router.push(`/j/${frame.txId}/${i}`);
  }

  return selectComment;
}

export default useSelectComment;