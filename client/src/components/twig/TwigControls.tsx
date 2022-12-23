import { IonButton, IonButtons, IonIcon } from '@ionic/react';
import { ellipsisVertical } from 'ionicons/icons';
import React, { useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { Twig } from '../../warp/arrow/types';
import TwigOptions from './TwigOptions';
import useReplyTwig from '../../hooks/useReplyTwig';
import { Arrow } from '../../types';

//import useCenterTwig from './useCenterTwig';

interface TwigControlsProps {
  i: number;
  twig: Twig;
  arrow: Arrow;
}

function TwigControls({i, twig, arrow}: TwigControlsProps) {
  const dispatch = useAppDispatch();

  const [showOptions, setShowOptions] = useState(false);

  const replyTwig = useReplyTwig();

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
    replyTwig({ i, twig, arrow });
  }

  const handleLinkClick = (event: React.MouseEvent) => {
    event.stopPropagation();

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
        id={'twigOptions-' + i} 
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
      <TwigOptions isOpen={showOptions} setIsOpen={setShowOptions} i={i} twig={twig} arrow={arrow} />
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

export default React.memo(TwigControls)