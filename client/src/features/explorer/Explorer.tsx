import { IonButton, IonButtons, IonCard, IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { useContext } from "react";
import { AppContext } from "../../app/AppProvider";
import useCreateArrow from "../arrow/useCreateArrow";
import { v4 } from 'uuid';
import UserStatus from "../user/UserStatus";

const Explorer = () => {
  const { walletAddress } = useContext(AppContext);
  const createArrow = useCreateArrow();

  const handleNewTabClick = () => {
    if (!walletAddress) return;

    createArrow({
      id: v4(),
      name: '',
      description: '',
      data: '',
      creatorAddress: walletAddress,
      sourceAddress: null,
      targetAddress: null,
      parentAddress: null,
      twigs: [],
      votes: [],
      roles: [],
      addressToPointBalance: {
        [walletAddress]: 1000000000,
      },
      createDate: Date.now(),
      updateDate: Date.now(),
      deleteDate: null,
    });
  }

  return (
    <IonCard>
      Explorer
      <IonButtons>
        <IonButton onClick={handleNewTabClick}>
          <IonIcon icon={addOutline} />
        </IonButton>
      </IonButtons>
      <UserStatus />
    </IonCard>
  )
}

export default Explorer;