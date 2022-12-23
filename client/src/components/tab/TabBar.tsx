import { IonCard, isPlatform } from "@ionic/react";
import { useContext, useRef } from "react";
import { AppContext } from "../app/AppProvider";
import { TAB_HEIGHT } from "../../constants";
import NewTabButton from "./NewTabButton";
import Tab from "./Tab";

const TabBar = () => {
  const { profile, isDarkMode } = useContext(AppContext);

  const tabsRef = useRef<HTMLIonCardElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (tabsRef.current) {
      tabsRef.current.scrollLeft += e.deltaY;
    }
  }

  return (
    <div style={{
      overflow: 'clip',
      height: isPlatform('iphone')
        ? TAB_HEIGHT + 1
        : TAB_HEIGHT + 2,
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        left: 0,
        top: 1,
        zIndex: 10,
      }}>
        <NewTabButton />
      </div>
      <IonCard ref={tabsRef} onWheel={handleWheel} style={{
        margin: 0,
        borderRadius: 0,
        width: '100%',
        scrollbarWidth: 'none',
        backgroundColor: isDarkMode
          ? '#444444'
          : '#dddddd',
        whiteSpace: 'nowrap',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'left',
        overflowX: 'scroll',
        padding: 1,
        paddingLeft: isPlatform('iphone') ? 1 : 2,
        bottomShadow: 'none',
      }}>
        {
          (profile?.tabs || []).map((arrowTxId, i) => {
            return (
              <Tab key={'tab-' + arrowTxId} arrowTxId={arrowTxId} i={i}/>
            )
          })
        }
        <div style={{
          display: 'flex',
          minWidth: 40,
          minHeight: TAB_HEIGHT,
        }}/>
      </IonCard>
    </div>
  )
}

export default TabBar;