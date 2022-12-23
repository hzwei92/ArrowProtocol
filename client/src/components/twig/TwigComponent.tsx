import { useEffect } from 'react';
import { VIEW_RADIUS } from '../../constants';
import { Twig } from '../../warp/arrow/types';
import { selectFrame, selectTxIdToArrow } from '../../redux/slices/arrowSlice';
import useReadArrowState from '../../warp/arrow/actions/read/useReadArrowState';
import LinkTwig from './LinkTwig';
import PostTwig from './PostTwig';
import { useAppSelector } from '../../redux/store';

interface TwigProps {
  i: number;
  twig: Twig;
}

const TwigComponent = ({ i, twig }: TwigProps) => {
  const readArrowState = useReadArrowState();

  const txIdToArrow = useAppSelector(selectTxIdToArrow);
  const frame = useAppSelector(selectFrame);

  useEffect(() => {
    if (twig.detailAddress){
      const arrow = txIdToArrow[twig.detailAddress];
      if (!arrow) {
        readArrowState(twig.detailAddress);
      }
    }
  }, [twig.detailAddress]);

  if (!frame) return null;

  let arrow;
  if (twig.detailAddress) {
    arrow = txIdToArrow[twig.detailAddress];
  }
  else if (i === 0) {
    arrow = frame;
  }

  if (!arrow) return null;

  return (
    <div id={`twig-${i}`} style={{
      position: 'absolute',
      left: VIEW_RADIUS + twig.x,
      top: VIEW_RADIUS + twig.y,
      zIndex: frame.state.twigIs.indexOf(i),
    }}>
      {
        arrow?.state.sourceAddress === arrow?.state.targetAddress
          ? <PostTwig i={i} twig={twig} arrow={arrow}/>
          : <LinkTwig i={i} twig={twig} arrow={arrow}/>
      }
    </div>
  )
}

export default TwigComponent