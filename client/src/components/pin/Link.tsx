import { IonCard } from "@ionic/react";
import { MouseEvent, useContext } from "react";
import { COMMENT_WIDTH } from "../../constants";
import useExpandPin from "../../hooks/pin/useExpandPin";
import { selectFrame } from "../../redux/slices/arrowSlice";
import { useAppSelector } from "../../redux/store";
import { Arrow } from "../../types";
import { Pin } from "../../warp/arrow/types";
import { AppContext } from "../app/AppProvider";
import ArrowComponent from "../arrow/ArrowComponent";
import PinControls from "./PinControls";
import LinkBar from "./LinkBar";

interface LinkProps {
  i: number;
  pin: Pin;
  arrow: Arrow;
}

const Link = ({i, pin, arrow}: LinkProps) => {
  const { pendingLink } = useContext(AppContext);

  const frame = useAppSelector(selectFrame);
  const isSelected = frame?.focusI === i;
  const isLinking = pendingLink.sourcePinI === i || pendingLink.targetPinI === i;
  
  const expandPin = useExpandPin();

  const handleExpandClick = (e: MouseEvent) => {
    e.stopPropagation();
    expandPin({i, isExpanded: true});
  }

  if (pin.isExpanded) {
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
        fontSize: 10,
        backgroundColor: isLinking
          ? arrow.state.color
          : null,
        cursor: pendingLink.sourcePinI !== null
          ? 'crosshair'
          : 'default', 
      }}>
        <div style={{
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 10,
        }}>
          <LinkBar i={i} pin={pin} arrow={arrow} />
        </div>
        <ArrowComponent arrow={arrow}/>
        <PinControls i={i} pin={pin} arrow={arrow}/>
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
      pointerEvents: 'auto',
      opacity: .6,
      alignItems: 'center',
      fontSize: 10,
      cursor: pendingLink.sourcePinI !== null
        ? 'crosshair'
        : 'default', 

      backgroundColor: isLinking
      ? arrow.state.color
      : null,
    }}>
      { arrow.state.weight }
    </IonCard>
  )
}

export default Link;