import { IonButton, IonButtons, IonIcon, useIonToast } from "@ionic/react";
import { copyOutline } from "ionicons/icons";

interface AddressComponentProps {
  address: string;
  fontSize: number;
}
const AddressComponent = ({ address, fontSize }: AddressComponentProps) => {
  const [present] = useIonToast();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(address);
    present(`Copied address: ${address}`, 3000)
  }

  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: 'row',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontSize,
        fontWeight: 'bold',
      }}>
        {address.slice(0,6)}...{address.slice(-6)}
      </div>
      <IonButtons>
        <IonButton onClick={handleCopyClick} style={{
        }}>
          <IonIcon icon={copyOutline} style={{
            fontSize,
          }}/>
        </IonButton>
      </IonButtons>
    </div>
  )
}

export default AddressComponent;