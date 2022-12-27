import { useEffect } from 'react';
import { VIEW_RADIUS } from '../../constants';
import { Pin } from '../../warp/arrow/types';
import { selectFrame, selectTxIdToArrow } from '../../redux/slices/arrowSlice';
import useReadArrowState from '../../warp/arrow/actions/read/useReadArrowState';
import Link from './Link';
import Post from './Post';
import { useAppSelector } from '../../redux/store';
import useSelectPin from '../../hooks/useSelectPin';

interface PinProps {
  i: number;
  pin: Pin;
}

const PinComponent = ({ i, pin }: PinProps) => {
  const readArrowState = useReadArrowState();

  const txIdToArrow = useAppSelector(selectTxIdToArrow);
  const frame = useAppSelector(selectFrame);

  const isSelected = frame?.focusI === i;

  const selectPin = useSelectPin();

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

  if (!frame || !arrow) return null;

  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!isSelected) {
      selectPin({ i });
    }
  }

  return (
    <div id={`pin-${i}`} 
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