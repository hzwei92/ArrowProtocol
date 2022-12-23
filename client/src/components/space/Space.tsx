import { useAppSelector } from "../../redux/store"
import { OFF_WHITE, SCROLL_SENSITIVITY, VIEW_RADIUS } from "../../constants";
import { selectFrame, selectTxIdToArrow } from "../../redux/slices/arrowSlice"
import TwigComponent from "../twig/TwigComponent"
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { Fragment, MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../app/AppProvider";
import useMoveTwig from "../../hooks/useMoveTwig";
import useWriteTwigs from "../../warp/arrow/actions/write/useWriteTwigs";
import MarkerDefs from "./MarkerDefs";
import Marker from "./Marker";
import SpaceNav from "./SpaceNav";

const Space = () => {
  const { cursor, setCursor, drag, setDrag, isDarkMode } = useContext(AppContext);

  const frame = useAppSelector(selectFrame);
  const txIdToArrow = useAppSelector(selectTxIdToArrow);

  const spaceRef = useRef<ReactZoomPanPinchRef>(null);
  
  const moveTwig = useMoveTwig();
  const writeTwigs = useWriteTwigs();

  const focusTwig = frame?.state.twigs[frame?.focusI];
  const focusArrow = focusTwig?.detailAddress
    ? txIdToArrow[focusTwig.detailAddress]
    : null;

  useEffect(() => {
    spaceRef.current?.zoomToElement(`twig-${frame?.focusI}`, 1.2, 200);
  }, [frame?.txId, frame?.focusI, focusArrow]);

  const [mouseMoveEvent, setMouseMoveEvent] = useState<MouseEvent | null>(null);

  useEffect(() => {
    if (!mouseMoveEvent || !spaceRef.current) return;

    const {
      positionX,
      positionY,
      scale,
    } = spaceRef.current.state;

    const { clientX, clientY } = mouseMoveEvent;

    const x = (clientX - positionX) / scale;
    const y = (clientY - positionY) / scale;

    setCursor({ x, y });
  
    if (drag.twigI) {
      const dx = Math.round(x - cursor.x);
      const dy = Math.round(y - cursor.y);
  
      moveTwig({ twigI: drag.twigI, dx, dy })
    }

    setMouseMoveEvent(null);
  }, [mouseMoveEvent]);
  
  const handleMouseDown = (e: MouseEvent) => {
    setDrag({
      isScreen: true,
      twigI: null,
      targetTwigI: null,
    });
  }

  const handleMouseUp = (e: MouseEvent) => {
    setDrag({
      isScreen: false,
      twigI: null,
      targetTwigI: null,
    });
    if (drag.twigI !== null) {
      writeTwigs();
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!mouseMoveEvent) {
      setMouseMoveEvent(e);
    }
  }

  return (
    <div 
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{
        margin: 0,
        padding: 0,
        height: '100%',
        width: '100%',
        backgroundColor: isDarkMode
          ? 'black'
          : OFF_WHITE,
        borderRadius: 0,
        cursor: drag.isScreen || !!drag.twigI
          ? 'grabbing'
          : 'grab',
        position: 'relative',
      }}
    >
      <TransformWrapper
        ref={spaceRef}
        initialScale={1}
        minScale={.03125}
        maxScale={4}
        initialPositionX={VIEW_RADIUS}
        initialPositionY={VIEW_RADIUS}
        centerZoomedOut={false}
        panning={{
          disabled: !!drag.twigI,
        }}
        wheel={{
          step: SCROLL_SENSITIVITY,
        }}
      >
        {(ref) => (
          <Fragment>
            <TransformComponent
              wrapperStyle={{
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
              }}
              contentStyle={{
                width: 2 * VIEW_RADIUS,
                height: 2 * VIEW_RADIUS,
                backgroundColor: isDarkMode
                  ? 'black'
                  : OFF_WHITE,
                borderRadius: 200,
                outline: '10px solid',
                outlineColor: isDarkMode
                  ? 'white'
                  : 'black',
              }}
            >
              <svg viewBox={`0 0 ${VIEW_RADIUS * 2} ${VIEW_RADIUS * 2}`} style={{
                width: VIEW_RADIUS * 2,
                height: VIEW_RADIUS * 2,
              }}>
                <MarkerDefs />
                {
                  (frame?.state.twigs || []).map((twig, i) => {
                    return (
                      <Marker key={'marker-'+i} i={i} twig={twig}/>
                    )
                  })
                }
              </svg>
              {
                (frame?.state.twigs || []).map((twig, i) => {
                  return (
                    <TwigComponent key={'twig-'+i} i={i} twig={twig}/>
                  )
                })
              }
            </TransformComponent>
          </Fragment>
        )}
      </TransformWrapper>
      <SpaceNav spaceRef={spaceRef}/>
    </div>
  )
}

export default Space