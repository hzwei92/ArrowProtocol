import { MouseEvent, useContext, useEffect } from 'react';
import { VIEW_RADIUS } from '../../constants';
import { Pin } from '../../warp/arrow/types';
import { selectFrame, selectTxIdToArrow } from '../../redux/slices/arrowSlice';
import useReadArrowState from '../../warp/arrow/actions/read/useReadArrowState';
import Link from './Link';
import Post from './Post';
import { useAppSelector } from '../../redux/store';
import useSelectPin from '../../hooks/useSelectPin';
import useLinkPins from '../../hooks/useLinkPins';
import { AppContext } from '../app/AppProvider';

interface PinProps {
  i: number;
  pin: Pin;
}

const PinComponent = ({ i, pin }: PinProps) => {
  const { pendingLink, setPendingLink } = useContext(AppContext);
  const txIdToArrow = useAppSelector(selectTxIdToArrow);
  const frame = useAppSelector(selectFrame);

  const isSelected = frame?.focusI === i;

  const readArrowState = useReadArrowState();
  const selectPin = useSelectPin();
  const linkPins = useLinkPins();

  useEffect(() => {
    if (pin.txId){
      const arrow = txIdToArrow[pin.txId];
      if (!arrow) {
        readArrowState(pin.txId);
      }
    }
  }, [pin.txId]);

  let arrow;
  if (pin.txId) {
    arrow = txIdToArrow[pin.txId];
  }
  else if (i === 0) {
    arrow = frame;
  }


  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    
    if (pendingLink.sourcePinI !== null) {
      if (pendingLink.sourcePinI !== i) {
        console.log('linking');
        linkPins({
          sourcePinI: pendingLink.sourcePinI,
          targetPinI: i,
        });
      }
      setPendingLink({
        sourcePinI: null,
        targetPinI: null,
      })
    }
  }

  const handleMouseEnter = (e: MouseEvent) => {
    if (pendingLink.sourcePinI !== null && pendingLink.sourcePinI !== i) {
      setPendingLink({
        ...pendingLink,
        targetPinI: i,
      });
    }
  }

  const handleMouseLeave = (e: MouseEvent) => {
    if (pendingLink.sourcePinI !== null && pendingLink.sourcePinI !== i && pendingLink.targetPinI === i) {
      setPendingLink({
        ...pendingLink,
        targetPinI: null,
      });
    }
  }

  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!isSelected && pendingLink.sourcePinI === null) {
      selectPin({ i });
    }
  }
  
  if (!frame || !arrow) return null;

  return (
    <div id={`pin-${i}`} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: VIEW_RADIUS + pin.x,
        top: VIEW_RADIUS + pin.y,
      }}
    >
      {
        arrow?.state.sourceTxId === arrow?.state.targetTxId
          ? <Post i={i} pin={pin} arrow={arrow}/>
          : <Link i={i} pin={pin} arrow={arrow}/>
      }
    </div>
  )
}

export default PinComponent