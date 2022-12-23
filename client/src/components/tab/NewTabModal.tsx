import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonInput, IonItem, IonLabel, IonModal, IonTextarea } from "@ionic/react";
import { useContext, useState } from "react";
import { AppContext } from "../app/AppProvider";
import useCreateNewTab from "../../hooks/useCreateNewTab";

const CreateArrowModal = () => {
  const { showCreateArrowModal, setShowCreateArrowModal } = useContext(AppContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const createNewTab = useCreateNewTab();

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  }
  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  }
  const handleClose = () => {
    setShowCreateArrowModal(false);
  }

  const handleSubmit = () => {
    createNewTab({
      name,
      description,
    });
    handleClose();
  }

  return (
    <IonModal isOpen={showCreateArrowModal} onWillDismiss={handleClose}>
      <IonCard style={{
        margin: 0,
        height: '100%',
      }}>
        <IonCardHeader>
          Create Arrow
        </IonCardHeader>
        <IonCardContent>
          <IonItem style={{
            border: '1px solid',
            borderRadius: 5,
            marginBottom: 10,
          }}>
            <IonLabel>
              Name
            </IonLabel>
            <IonInput
              value={name}
              onIonChange={handleNameChange}
            />
          </IonItem>
          <IonItem style={{
            border: '1px solid',
            borderRadius: 5,
          }}>
            <IonLabel>
              Description
            </IonLabel>
            <IonTextarea
              value={description}
              onIonChange={handleDescriptionChange}
            />
          </IonItem>
          <IonButtons>
            <IonButton onClick={handleSubmit}>
              CREATE
            </IonButton>
            <IonButton onClick={handleClose}>
              CANCEL
            </IonButton>
          </IonButtons>
        </IonCardContent>
      </IonCard>
    </IonModal>
  )
}

export default CreateArrowModal;