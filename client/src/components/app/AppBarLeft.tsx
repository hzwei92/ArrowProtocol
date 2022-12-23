import { IonButton, IonButtons, IonCard } from "@ionic/react"
import icon from './favicon.png';

const AppBarLeft = () => {
  return (
    <IonCard style={{
      margin: 0,
      borderRadius: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      minHeight: '100%',
      width: 50,
      overflow: 'visible',
    }}>
      <IonButtons style={{
        display: 'flex',
        flexDirection: 'column',

      }}>
        <IonButton style={{
          height: 50,
          width: 50,
        }}>
          <img src={icon} style={{
            transform: 'scale(.85)',
          }}/>
        </IonButton>
      </IonButtons>
    </IonCard>
  )
}

export default AppBarLeft;