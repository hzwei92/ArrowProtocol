import { IonCard } from "@ionic/react";
import { selectFrame } from "../../redux/slices/arrowSlice";
import { useAppSelector } from "../../redux/store";
import { Arrow } from "../../types";
import { Comment } from "../../warp/arrow/types";

interface LinkCommentProps {
  i: number;
  comment: Comment;
  arrow: Arrow;
}

const LinkComment = ({i, comment, arrow}: LinkCommentProps) => {
  const frame = useAppSelector(selectFrame);
  const isSelected = frame?.focusI === i;

  return (
    <IonCard style={{
      margin: 0,
      outline: isSelected
        ? `5px solid ${arrow?.state.color}`
        : null,
      border: `1px solid ${arrow?.state.color}`,
      borderRadius: 8,
      borderTopLeftRadius: 0,
      width: 30,
      height: 30,
      display: 'flex',
      justifyContent: 'center',
      cursor: 'pointer',
      pointerEvents: 'auto',
      opacity: .6,
    }}>
    </IonCard>
  )
}

export default LinkComment;