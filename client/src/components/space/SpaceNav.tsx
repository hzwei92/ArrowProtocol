import React, { useContext, useEffect, useState } from 'react';
import { IonFab, IonFabButton, IonIcon, isPlatform } from '@ionic/react';
import { playBackOutline, playForwardOutline, playSkipBackOutline, playSkipForwardOutline } from 'ionicons/icons';
import { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import useSelectPin from '../../hooks/useSelectPin';
import { useAppSelector } from '../../redux/store';
import { selectFrame } from '../../redux/slices/arrowSlice';

interface SpaceNavProps {
  spaceRef: React.RefObject<ReactZoomPanPinchRef>;
}
export default function SpaceNav({ spaceRef }: SpaceNavProps) {
  const frame = useAppSelector(selectFrame);
  const selectPin = useSelectPin();

  if (!frame) return null;

  const handleNavEarliest = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    selectPin({ i: 0 });
  }

  const handleNavPrev = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    let i = frame.focusI - 1;
    while (i > 0 && frame.state.pins[i].deleteDate) {
      i--;
    }
    selectPin({ i })
  }

  const handleNavNext = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    let i = frame.focusI + 1;
    while (i < frame.state.pins.length - 1 && frame.state.pins[i].deleteDate) {
      i++;
    }
    selectPin({ i })
  }

  const handleNavLatest = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    let i = frame.state.pins.length - 1;
    while (i > 0 && frame.state.pins[i].deleteDate) {
      i--;
    }
    selectPin({ i })
  }

  const handleNavFocus = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    spaceRef.current?.zoomToElement(`pin-${frame.focusI}`, undefined, 200);
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
  }
  
  const disablePrev = !frame.state.pins.slice(0, frame.focusI).find(pin => !pin.deleteDate);
  const disableNext = !frame.state.pins.slice(frame.focusI + 1).find(pin => !pin.deleteDate);
  return (
    <div onMouseMove={handleMouseMove} style={{
      display: isPlatform('mobile') //&& mode !== Mode.PORTAL
        ? 'none'
        : 'block',
      position: 'absolute',
      marginLeft: -140,
      left: '50%',
      bottom: 70,
    }}>
      <IonFab style={{
        position: 'fixed',
        whiteSpace: 'nowrap',
        display: 'flex',
        flexDirection: 'row',
      }}>
        <IonFabButton title='Earliest' disabled={disablePrev} color={'light'} onClick={handleNavEarliest} size='small'>
          <IonIcon icon={playSkipBackOutline} />
        </IonFabButton>
        <IonFabButton title='Previous' disabled={disablePrev} color={'light'} onClick={handleNavPrev} size='small'>
          <IonIcon icon={playBackOutline} />
        </IonFabButton>
        <IonFabButton title='Selected' color={'light'} onClick={handleNavFocus} size='small'>
          { frame.focusI }
        </IonFabButton>
        <IonFabButton title='Next' disabled={disableNext} color={'light'} onClick={handleNavNext} size='small'>
          <IonIcon icon={playForwardOutline}/>
        </IonFabButton>
        <IonFabButton title='Latest' disabled={disableNext} color={'light'} onClick={handleNavLatest} size='small'>
          <IonIcon icon={playSkipForwardOutline} />
        </IonFabButton>
      </IonFab>
    </div>
  );
}