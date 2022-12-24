import { IonCard } from "@ionic/react";
import { MouseEvent, useContext } from "react";
import { useSelector } from "react-redux";
import { COMMENT_WIDTH } from "../../constants";
import useLinkComments from "../../hooks/useLinkComments";
import { selectFrame } from "../../redux/slices/arrowSlice";
import { Arrow } from "../../types";
import { Comment } from "../../warp/arrow/types";
import { AppContext } from "../app/AppProvider";
import ArrowComponent from "../arrow/ArrowComponent";
import PostBar from "./PostBar";
import CommentControls from "./CommentControls";

interface PostProps {
  i: number;
  comment: Comment;
  arrow: Arrow;
}

const Post = ({i, comment, arrow}: PostProps) => {
  const { pendingLink, setPendingLink } = useContext(AppContext);
  const frame = useSelector(selectFrame);
  const isSelected = i === frame?.focusI;
  const isLinking = pendingLink.sourceCommentI === i || pendingLink.targetCommentI === i;

  const linkComments = useLinkComments();

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    
    if (pendingLink.sourceCommentI !== null) {
      if (pendingLink.sourceCommentI !== i) {
        console.log('linking');
        linkComments({
          sourceCommentI: pendingLink.sourceCommentI,
          targetCommentI: i,
        });
      }
      setPendingLink({
        sourceCommentI: null,
        targetCommentI: null,
      })
    }
  }

  const handleMouseEnter = (e: MouseEvent) => {
    if (pendingLink.sourceCommentI !== null && pendingLink.sourceCommentI !== i) {
      setPendingLink({
        ...pendingLink,
        targetCommentI: i,
      });
    }
  }

  const handleMouseLeave = (e: MouseEvent) => {
    if (pendingLink.sourceCommentI !== null && pendingLink.sourceCommentI !== i && pendingLink.targetCommentI === i) {
      setPendingLink({
        ...pendingLink,
        targetCommentI: null,
      });
    }
  }

  return (
    <IonCard onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{
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
      cursor: pendingLink.sourceCommentI !== null
        ? 'crosshair'
        : 'default', 
      pointerEvents: 'auto',
      fontSize: 10,
    }}>
      <PostBar i={i} comment={comment} arrow={arrow} />
      <div style={{
        padding: 5,
      }}>
        <ArrowComponent arrow={arrow} />
        <CommentControls i={i} comment={comment} arrow={arrow}/>
      </div>
    </IonCard>
  )
}

export default Post;