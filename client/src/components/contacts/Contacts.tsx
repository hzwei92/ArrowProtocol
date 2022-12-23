import { IonCard, IonCardContent, IonCardHeader } from "@ionic/react"
import { useContext } from "react";
import { OFF_WHITE, TAB_HEIGHT } from "../../constants";
import { AppContext } from "../app/AppProvider";


const Contacts = () => {
  const { isDarkMode } = useContext(AppContext);
  return (
    <IonCard style={{
      margin: 0,
      borderRadius: 0,
      height: '100%',
      backgroundColor: isDarkMode
        ? 'black'
        : OFF_WHITE,
    }}>
      <IonCardHeader style={{
        height: TAB_HEIGHT,
      }}>
        CONTACTS
      </IonCardHeader>
      <IonCardContent style={{
        height: `calc(100% - ${TAB_HEIGHT}px)`,
        overflowY: 'scroll',
        padding: 0,
      }}>
      </IonCardContent>
    </IonCard>
  );
}

export default Contacts;