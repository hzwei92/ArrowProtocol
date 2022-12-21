import { IonButton, IonButtons, IonCard } from "@ionic/react"


const UserStatus = () => {
  const handleConnectClick = async () => {
    console.log('connect');
    await window.arweaveWallet.connect([
      'ACCESS_ADDRESS', 
      'ACCESS_PUBLIC_KEY', 
      'ACCESS_ALL_ADDRESSES',
      'SIGN_TRANSACTION',
    ], {
      name: 'JAMN',
      logo: 'https://images.emojiterra.com/twitter/v14.0/512px/1f251.png',
    })
  }
  const handleDisconnectClick = async () => {
    console.log('disconnect');
    await window.arweaveWallet.disconnect();
  }
  return (
    <IonCard>
      <IonButtons>
        <IonButton onClick={handleConnectClick}>
          CONNECT
        </IonButton>
        <IonButton onClick={handleDisconnectClick}>
          DISCONNECT
        </IonButton>
      </IonButtons>
    </IonCard>
  )
}

export default UserStatus;