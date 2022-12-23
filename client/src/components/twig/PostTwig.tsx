import { IonCard } from "@ionic/react";
import { TWIG_WIDTH } from "../../constants";
import { Arrow } from "../../types";
import { Twig } from "../../warp/arrow/types";
import ArrowComponent from "../arrow/ArrowComponent";
import TwigBar from "./TwigBar";
import TwigControls from "./TwigControls";

interface PostTwigProps {
  i: number;
  twig: Twig;
  arrow: Arrow;
}

const PostTwig = ({i, twig, arrow}: PostTwigProps) => {
  return (
    <IonCard style={{
      display: 'flex',
      flexDirection: 'column',
      width: TWIG_WIDTH,
      opacity: .9,
      margin: 0,
      outline: true // isSelected
        ? `5px solid ${arrow.state.color}`
        : null,
      border: `1px solid ${arrow.state.color}`,
      borderRadius: 8,
      borderTopLeftRadius: 0,
      backgroundColor: false //isLinking
        ? arrow.state.color
        : null,
      cursor: false// pendingLink.sourceArrowId
        ? 'crosshair'
        : 'default', 
      pointerEvents: 'auto',
      fontSize: 10,
    }}>
      <TwigBar i={i} twig={twig} arrow={arrow} isSelected={false} />
      <div style={{
        padding: 5,
      }}>
        <ArrowComponent arrow={arrow} />
        <TwigControls i={i} twig={twig} arrow={arrow}/>
      </div>
    </IonCard>
  )
}

export default PostTwig;