import { IonCard, IonCardContent, IonCardHeader } from "@ionic/react";
import { useContext } from "react";
import { OFF_WHITE, TAB_HEIGHT } from "../../constants";
import { selectSlice } from "../../redux/slices/explorerSlice";
import { useAppSelector } from "../../redux/store";
import { AppContext } from "../app/AppProvider";
import EntryTree from "../entry/EntryTree";

const Explorer = () => {
  const { isDarkMode } = useContext(AppContext);

  const slice = useAppSelector(selectSlice);

  return (
    <IonCard style={{
      margin: 0,
      borderRadius: 0,
      backgroundColor: isDarkMode
        ? 'black'
        : OFF_WHITE,
      height: '100%',
    }}>
      <IonCardHeader style={{
        height: TAB_HEIGHT,
      }}>
        EXPLORER
      </IonCardHeader>
      <IonCardContent style={{
        height: `calc(100% - ${TAB_HEIGHT}px)`,
        overflowY: 'scroll',
        padding: 0,
      }}>
        { 
          slice.entryIds.map((entryId) => {
            return (
              <EntryTree
                key={`entry-tree-${entryId}`}
                entryId={entryId}
                depth={0}
              />
            );
          })
        }
      </IonCardContent>
    </IonCard>
  )
}

export default Explorer;