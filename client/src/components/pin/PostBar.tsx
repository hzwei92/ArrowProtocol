import React, { useContext } from 'react';
import { useAppSelector } from '../../redux/store';
import { IonButton, IonButtons, IonIcon, IonLabel } from '@ionic/react';
import { addOutline, closeOutline, removeOutline } from 'ionicons/icons';
import { Pin } from '../../warp/arrow/types';
import { selectFrameTxId } from '../../redux/slices/arrowSlice';
import { AppContext } from '../app/AppProvider';
import { Arrow } from '../../types';
import useExpandPin from '../../hooks/useExpandPin';

interface PostBarProps {
  i: number;
  pin: Pin;
  arrow: Arrow;
}

function PostBar({ i, pin, arrow }: PostBarProps) {
  const { walletAddress, drag, setDrag, isDarkMode } = useContext(AppContext);

  const frameTxId = useAppSelector(selectFrameTxId);

  const expandPin = useExpandPin();

  const beginDrag = () => {
    if (i === 0) return;

    setDrag({
      isScreen: false,
      pinI: i,
      targetPinI: null,
    });
  }

  const dontDrag = (event: React.MouseEvent) => {
    event.stopPropagation();
  }

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    expandPin({ i, isExpanded: !pin.isExpanded });
  }

  const handleRemoveClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  }

  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    beginDrag();
  }

  const handleTouchStart = (event: React.TouchEvent) => {
    event.stopPropagation();
    beginDrag();
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        backgroundColor: arrow.state.color,
        textAlign: 'left',
        cursor: frameTxId === arrow.txId
            ? 'default'
            : drag.pinI === i
              ? 'grabbing'
              : 'grab',
        touchAction: 'none',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: '3px',
        paddingRight: '5px',
        width: '100%',
      }}>
        <div style={{
          display: 'flex',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <IonLabel style={{
              marginLeft: '3px',
              fontSize: 10,
              color: isDarkMode
                ? 'black'
                : 'white',
            }}>
              {i}
            </IonLabel>
          </div>
        </div>
        <IonButtons>
          <IonButton
            color='inherit'
            onMouseDown={dontDrag}
            onClick={handleExpandClick}
            style={{
              height: 20,
            }}
          >
            {
              pin.isExpanded
                ? <IonIcon icon={removeOutline} style={{
                    color: isDarkMode
                      ? 'black'
                      : 'white',
                    fontSize: 10,
                  }}/>
                : <IonIcon icon={addOutline} style={{
                    color: isDarkMode
                      ? 'black'
                      : 'white',
                    fontSize: 10,                  
                  }}/>
            }
          </IonButton>
          <IonButton
            disabled={
              frameTxId === arrow.txId || 
              (pin.creatorAddress !== walletAddress) //&& !canEdit) || 
              //!!pendingLink.sourceArrowId 
            } 
            color='inherit'
            onMouseDown={dontDrag}
            onClick={handleRemoveClick}
            style={{
              height: 20,
            }}
          >
            <IonIcon icon={closeOutline} style={{
              color: isDarkMode
                ? 'black'
                : 'white',
              fontSize: 10,
            }}/>
          </IonButton>
        </IonButtons>
      </div>
    </div>
  )
}

export default React.memo(PostBar)