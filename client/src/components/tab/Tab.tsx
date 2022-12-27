import { IonButton, IonButtons, IonCard, IonIcon, useIonRouter } from "@ionic/react";
import { close } from "ionicons/icons";
import { MouseEvent, useContext, useEffect } from "react";
import { useAppSelector } from "../../redux/store";
import { OFF_WHITE, TAB_HEIGHT } from "../../constants";
import { selectFrameTxId, selectTxIdToArrow } from "../../redux/slices/arrowSlice";
import useReadArrowState from "../../warp/arrow/actions/read/useReadArrowState";
import { AppContext } from "../app/AppProvider";
import useRemoveTab from "../../hooks/tab/useRemoveTab";

interface TabComponentProps {
  arrowTxId: string;
  i: number;
}
const TabComponent = ({ arrowTxId, i }: TabComponentProps) => {
  const router = useIonRouter();

  const { isDarkMode } = useContext(AppContext);

  const frameTxId = useAppSelector(selectFrameTxId);
  const txIdToArrow = useAppSelector(selectTxIdToArrow);

  const arrow = txIdToArrow[arrowTxId];

  const readArrowState = useReadArrowState();
  const removeTab = useRemoveTab();

  useEffect(() => {
    if (!arrow) {
      readArrowState(arrowTxId);
    }
  }, [arrow])

  const handleTabClick = () => {
    router.push(`/j/${arrowTxId}/${arrow.focusI}`)
  }

  const handleTabCloseClick = (e: MouseEvent) => {
    e.stopPropagation();
    removeTab({ arrowTxId })
  }

  if (!arrow) return null;

  return (
    <div style={{
      display: 'flex',
    }}>
      <IonCard
        onClick={handleTabClick}
        style={{
          margin: 0,
          marginRight: 1,
          backgroundColor: frameTxId === arrowTxId
            ? isDarkMode
              ? 'black'
              : OFF_WHITE
            : null,
          borderBottomLeftRadius: frameTxId === arrowTxId
            ? 0
            : null,
          borderBottomRightRadius: frameTxId === arrowTxId
            ? 0
            : null,
          display: 'inline-flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          flexShrink: 0,
          cursor: 'default',
          opacity: 1, //isOver ? 0.2 : 1,
          height: frameTxId === arrowTxId
            ? TAB_HEIGHT + 1
            : TAB_HEIGHT - 1,
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginLeft: 10,
        }}>
        { i + 1 }
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: arrow.state.color,
          marginLeft: 10,
          fontSize: 16,
        }}>
          { (arrow.state.text ?? '').split('\n')[0] }
        </div>
        <IonButtons style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <IonButton onClick={handleTabCloseClick} style={{
            padding: 0,
          }}>
            <IonIcon icon={close} />
          </IonButton>
        </IonButtons>
      </IonCard>
    </div>
  );
}

export default TabComponent;