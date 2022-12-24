import { IonCard } from "@ionic/react";
import { MouseEvent } from "react";
import { COMMENT_WIDTH } from "../../constants";
import useExpandComment from "../../hooks/useExpandComment";
import { selectFrame } from "../../redux/slices/arrowSlice";
import { useAppSelector } from "../../redux/store";
import { Arrow } from "../../types";
import { Comment } from "../../warp/arrow/types";
import ArrowComponent from "../arrow/ArrowComponent";
import CommentControls from "./CommentControls";
import LinkBar from "./LinkBar";

interface LinkProps {
  i: number;
  comment: Comment;
  arrow: Arrow;
}

const Link = ({i, comment, arrow}: LinkProps) => {
  const frame = useAppSelector(selectFrame);
  const isSelected = frame?.focusI === i;
  
  const expandComment = useExpandComment();

  const handleExpandClick = (e: MouseEvent) => {
    e.stopPropagation();
    expandComment({i, isExpanded: true});
  }

  if (comment.isExpanded) {
    return (
      <IonCard style={{
        margin: 0,
        outline: isSelected
          ? `5px solid ${arrow?.state.color}`
          : null, 
        border: `1px solid ${arrow?.state.color}`,
        borderRadius: 8,
        borderTopLeftRadius: 0,
        width: COMMENT_WIDTH,
        opacity: .9,
        padding: 5,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 10,
        }}>
          <LinkBar i={i} comment={comment} arrow={arrow} />
        </div>
        <ArrowComponent arrow={arrow}/>
        <CommentControls i={i} comment={comment} arrow={arrow}/>
      </IonCard>
    )
  }
  return (
    <IonCard onClick={handleExpandClick} style={{
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
      flexDirection: 'column',
      justifyContent: 'center',
      cursor: 'pointer',
      pointerEvents: 'auto',
      opacity: .6,
      alignItems: 'center',
      fontSize: 10,
    }}>
      { arrow.state.weight }
    </IonCard>
  )
}

export default Link;