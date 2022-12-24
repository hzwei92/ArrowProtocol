import { IonCard } from "@ionic/react";
import { MouseEvent, useContext } from "react";
import { useSelector } from "react-redux";
import { TWIG_WIDTH } from "../../constants";
import useLinkTwigs from "../../hooks/useLinkTwigs";
import { selectFrame } from "../../redux/slices/arrowSlice";
import { Arrow } from "../../types";
import { Twig } from "../../warp/arrow/types";
import { AppContext } from "../app/AppProvider";
import ArrowComponent from "../arrow/ArrowComponent";
import TwigBar from "./TwigBar";
import TwigControls from "./TwigControls";

interface PostTwigProps {
  i: number;
  twig: Twig;
  arrow: Arrow;
}

const PostTwig = ({i, twig, arrow}: PostTwigProps) => {
  const { pendingLink, setPendingLink } = useContext(AppContext);
  const frame = useSelector(selectFrame);
  const isSelected = i === frame?.focusI;
  const isLinking = pendingLink.sourceTwigI === i || pendingLink.targetTwigI === i;

  const linkTwigs = useLinkTwigs();

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    
    if (pendingLink.sourceTwigI !== null) {
      if (pendingLink.sourceTwigI !== i) {
        console.log('linking');
        linkTwigs({
          sourceTwigI: pendingLink.sourceTwigI,
          targetTwigI: i,
        });
      }
      setPendingLink({
        sourceTwigI: null,
        targetTwigI: null,
      })
    }
  }

  const handleMouseEnter = (e: MouseEvent) => {
    if (pendingLink.sourceTwigI !== null && pendingLink.sourceTwigI !== i) {
      setPendingLink({
        ...pendingLink,
        targetTwigI: i,
      });
    }
  }

  const handleMouseLeave = (e: MouseEvent) => {
    if (pendingLink.sourceTwigI !== null && pendingLink.sourceTwigI !== i && pendingLink.targetTwigI === i) {
      setPendingLink({
        ...pendingLink,
        targetTwigI: null,
      });
    }
  }

  return (
    <IonCard onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{
      display: 'flex',
      flexDirection: 'column',
      width: TWIG_WIDTH,
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
      cursor: pendingLink.sourceTwigI !== null
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