import { IonButton, IonButtons, IonCard, IonIcon, IonInput, IonItem } from "@ionic/react"
import { personCircle, search } from "ionicons/icons";
import { useContext } from "react";
import AddressComponent from "../address/AddressComponent";
import { AppContext } from "./AppProvider";


const AppBarTop = () => {
  const { walletAddress, setWalletAddress, profile, isDarkMode } = useContext(AppContext);

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
    });
    const address = await window.arweaveWallet.getActiveAddress();
    setWalletAddress(address);
  }

  const handleDisconnectClick = async () => {
    console.log('disconnect');
    setWalletAddress(undefined);
    await window.arweaveWallet.disconnect();
  }

  return (
    <IonCard style={{
      margin: 0,
      borderRadius: 0,
      borderLeft: '1px solid',
      borderColor: isDarkMode
        ? '#222222'
        : 'lavender',
      width: '100%',
      height: 50,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      boxShadow: 'none',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
      }}>
        <IonButtons>
          <IonButton>
            <IonIcon icon={search} />
          </IonButton>
        </IonButtons>
        <IonInput
          placeholder="Search"
        />
      </div>
      <div>
        {
          walletAddress
            ? (
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                height: '100%',
                justifyContent: 'right',
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  margin: 5,
                }}>
                  <IonIcon icon={personCircle} style={{
                    fontSize: 20,
                    color: profile?.color,
                  }}/>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  margin: 5,
                }}>
                  <AddressComponent address={walletAddress} fontSize={12} />
                </div>
                <IonButtons>
                  <IonButton onClick={handleDisconnectClick}>
                    DISCONNECT
                  </IonButton>
                </IonButtons>
              </div>
            )
            : (
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                height: '100%',
                justifyContent: 'right',
              }}>
                <IonButtons>
                  <IonButton onClick={handleConnectClick}>
                    CONNECT
                  </IonButton>
                </IonButtons>
              </div>
            )
        }
      </div>
    </IonCard>
  );
}

export default AppBarTop;