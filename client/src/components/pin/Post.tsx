import { IonCard } from "@ionic/react";
import { MouseEvent, useContext } from "react";
import { useSelector } from "react-redux";
import { COMMENT_WIDTH } from "../../constants";
import useLinkPins from "../../hooks/useLinkPins";
import { selectFrame } from "../../redux/slices/arrowSlice";
import { Arrow } from "../../types";
import { Pin } from "../../warp/arrow/types";
import { AppContext } from "../app/AppProvider";
import ArrowComponent from "../arrow/ArrowComponent";
import PostBar from "./PostBar";
import PinControls from "./PinControls";

interface PostProps {
  i: number;
  pin: Pin;
  arrow: Arrow;
}

const Post = ({i, pin, arrow}: PostProps) => {
  const { pendingLink } = useContext(AppContext);
  const frame = useSelector(selectFrame);
  const isSelected = i === frame?.focusI;
  const isLinking = pendingLink.sourcePinI === i || pendingLink.targetPinI === i;

  return (
    <IonCard style={{
      display: 'flex',
      flexDirection: 'column',
      width: COMMENT_WIDTH,
      opacity: .9,
      margin: 0,
      outline: isSelected
        ? `5px solid ${arrow.state.color}`
        : null,
      border: `1px solid ${arrow.state.color}`,
      borderRadius: 8,
      borderTopLeftRadius: 0,
      backgroundColor: isLinking
        ? arrow.state.color
        : null,
      cursor: pendingLink.sourcePinI !== null
        ? 'crosshair'
        : 'default', 
      pointerEvents: 'auto',
      fontSize: 10,
    }}>
      <PostBar i={i} pin={pin} arrow={arrow} />
      <div style={{
        padding: 5,
      }}>
        <ArrowComponent arrow={arrow} />
        <PinControls i={i} pin={pin} arrow={arrow}/>
      </div>
    </IonCard>
  )
}

export default Post;