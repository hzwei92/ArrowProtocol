import { IonButton, IonButtons, IonIcon } from '@ionic/react';
import { ellipsisVertical } from 'ionicons/icons';
import React, { useContext, useState } from 'react';
import { Pin } from '../../warp/arrow/types';
import PinOptions from './PinOptions';
import useReplyPin from '../../hooks/pin/useReplyPin';
import { Arrow } from '../../types';
import { AppContext } from '../app/AppProvider';
import useOpenArrowInNewTab from '../../hooks/tab/useOpenArrowInNewTab';

interface PinControlsProps {
  i: number;
  pin: Pin;
  arrow: Arrow;
}

function PinControls({i, pin, arrow}: PinControlsProps) {
  const { walletAddress, setPendingLink } = useContext(AppContext);

  const [showOptions, setShowOptions] = useState(false);

  const replyPin = useReplyPin();
  const openArrowInNewTab = useOpenArrowInNewTab();

  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
  }

  const handleOptionsClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowOptions(true);
  }

  const handleOpenClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    openArrowInNewTab({ txId: arrow.txId })
  }

  const handleReplyClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    replyPin({ i, pin, arrow });
  }

  const handleLinkClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setPendingLink({
      sourcePinI: i,
      targetPinI: null,
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
        disabled={!walletAddress}
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
        disabled={!walletAddress}
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
        id={'pin-options-' + i} 
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
      <PinOptions isOpen={showOptions} setIsOpen={setShowOptions} i={i} pin={pin} arrow={arrow} />
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
        disabled={i === 0}
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

export default React.memo(PinControls)