import React, { useContext } from 'react';
import { useAppSelector } from '../../redux/store';
import { IonButton, IonButtons, IonIcon } from '@ionic/react';
import { closeOutline, removeOutline } from 'ionicons/icons';
import { Pin } from '../../warp/arrow/types';
import { selectFrameTxId } from '../../redux/slices/arrowSlice';
import { AppContext } from '../app/AppProvider';
import { Arrow } from '../../types';
import useExpandPin from '../../hooks/useExpandPin';

interface LinkBarProps {
  i: number;
  pin: Pin;
  arrow: Arrow;
}

function LinkBar({i, pin, arrow }: LinkBarProps) {
  const { walletAddress, pendingLink } = useContext(AppContext);

  const frameTxId = useAppSelector(selectFrameTxId);

  const expandPin = useExpandPin();


  const handleCollapseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    expandPin({ i, isExpanded: false });
  }

  const handleRemoveClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  }

  return (
    <IonButtons>
      <IonButton style={{
        height: 20,
        fontSize: 10,
      }}>
        {i}
      </IonButton>
      <IonButton onClick={handleCollapseClick} style={{
        height: 20,
      }}>
        <IonIcon icon={removeOutline} style={{
          fontSize: 10,
        }}/>
      </IonButton>
      <IonButton
        disabled={
          frameTxId === arrow.txId || 
          (pin.creatorAddress !== walletAddress) ||
          pendingLink.sourcePinI !== null
        } 
        onClick={handleRemoveClick}
        style={{
          height: 20,
        }}
      >
        <IonIcon icon={closeOutline} style={{
          fontSize: 10,
        }}/>
      </IonButton>
    </IonButtons>
  )
}

export default React.memo(LinkBar)