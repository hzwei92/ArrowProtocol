import { IonButton, IonButtons, IonIcon } from '@ionic/react';
import { ellipsisVertical } from 'ionicons/icons';
import React, { useContext, useState } from 'react';
import { Comment } from '../../warp/arrow/types';
import CommentOptions from './CommentOptions';
import useReplyComment from '../../hooks/useReplyComment';
import { Arrow } from '../../types';
import { AppContext } from '../app/AppProvider';

//import useCenterComment from './useCenterComment';

interface CommentControlsProps {
  i: number;
  comment: Comment;
  arrow: Arrow;
}

function CommentControls({i, comment, arrow}: CommentControlsProps) {
  const { setPendingLink } = useContext(AppContext);

  const [showOptions, setShowOptions] = useState(false);

  const replyComment = useReplyComment();

  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
  }

  const handleOptionsClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowOptions(true);
  }

  const handleOpenClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(arrow);
  }

  const handleReplyClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    replyComment({ i, comment, arrow });
  }

  const handleLinkClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setPendingLink({
      sourceCommentI: i,
      targetCommentI: null,
    });
  }

  const handlePrevClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  }

  const handleNextClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  }

  return (
    <IonButtons style={{
      marginLeft: 5,
      marginTop: 0,
      marginBottom: -5,
      display: 'flex',
      flexDirection: 'row',
    }}>
      <IonButton
        onMouseDown={handleMouseDown} 
        onClick={handleReplyClick}
        style={{
          fontSize: 5,
          height: 20,
        }}
      >
        REPLY
      </IonButton>
      <IonButton 
        onMouseDown={handleMouseDown} 
        onClick={handleLinkClick}
        style={{
          fontSize: 5,
          height: 20,
        }}
      >
        LINK
      </IonButton>
      <IonButton 
        id={'comment-options-' + i} 
        size='small'
        onMouseDown={handleMouseDown} 
        onClick={handleOptionsClick}
        style={{
          height: 20,
        }}
      >
        <IonIcon icon={ellipsisVertical} style={{
          fontSize: 5,
        }}/>
      </IonButton>
      <CommentOptions isOpen={showOptions} setIsOpen={setShowOptions} i={i} comment={comment} arrow={arrow} />
      <IonButton 
        onMouseDown={handleMouseDown} 
        onClick={handlePrevClick}
        style={{
          fontSize: 5,
          height: 20,
        }}
      >
        IN
      </IonButton>
      <IonButton 
        onMouseDown={handleMouseDown} 
        onClick={handleNextClick}
        style={{
          fontSize: 5,
          height: 20,
        }}
      >
        OUT
      </IonButton>
      <IonButton
        onMouseDown={handleMouseDown}
        onClick={handleOpenClick}
        style={{
          fontSize: 5,
          height: 20,
        }}
      >
        OPEN
      </IonButton>
    </IonButtons>
  )
}

export default React.memo(CommentControls)