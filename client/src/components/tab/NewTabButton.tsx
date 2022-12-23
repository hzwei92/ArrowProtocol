import { IonButton, IonButtons, IonCard, IonIcon } from "@ionic/react"
import { add } from "ionicons/icons";
import { useContext } from "react";
import { AppContext } from "../app/AppProvider";
import { TAB_HEIGHT } from "../../constants"

const NewTabButton = () => {
  const { setShowCreateArrowModal } = useContext(AppContext);

  const handleNewTabClick = () => {
    setShowCreateArrowModal(true);
  }

  return (
    <IonCard id={'new-tab-button'} 
      style={{
        margin: 0,
        marginLeft: 1,
        display: 'inline-flex',
        cursor: 'pointer',
        flexShrink: 0,
        position: 'fixed',
        height: TAB_HEIGHT - 1,
      }}
    >
      <IonButtons style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <IonButton onClick={handleNewTabClick} style={{
          padding: 0,
        }}>
          <IonIcon icon={add} />
        </IonButton>
      </IonButtons>
    </IonCard>
  )
}

export default NewTabButton;