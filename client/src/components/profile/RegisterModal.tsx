import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonTextarea } from "@ionic/react";
import { useContext, useState } from "react";
import { ChromePicker } from "react-color";
import { AppContext } from "../app/AppProvider";
import useRegister from "../../warp/jamn/actions/write/useRegister";
import useReadProfile from "../../warp/jamn/actions/read/useReadProfile";

const RegisterModal = () => {
  const { showRegisterModal, setShowRegisterModal } = useContext(AppContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(() => `#${Math.round(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0')}`);

  const register = useRegister();
  const readProfile = useReadProfile();

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  }
  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  }
  const handleColorChange = (color: any) => {
    setColor(color.hex);
  };
  
  const handleRandomize = () => {
    const color1 = `#${Math.round(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0')}`;
    setColor(color1);
  }

  const handleClose = () => {
    setShowRegisterModal(false);
  }

  const handleSubmit = async () => {
    await register({name, description, color});
    await readProfile();
    handleClose();
  }

  return (
    <IonModal isOpen={showRegisterModal} onWillDismiss={handleClose}>
      <IonCard style={{
        margin: 0,
        height: '100%',
      }}>
        <IonCardHeader>
          Register
        </IonCardHeader>
        <IonCardContent>
          <div style={{
            border: '1px solid',
            borderRadius: 5,
            marginBottom: 10,
          }}>
            <IonInput
              value={name}
              onIonChange={handleNameChange}
              placeholder={'Name'}
            />
          </div>
          <div style={{
            border: '1px solid',
            borderRadius: 5,
            marginBottom: 10,
          }}>
            <IonTextarea
              value={description}
              onIonChange={handleDescriptionChange}
              placeholder={'Bio'}
            />
          </div>
          <div style={{
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'left',
          }}>
            <ChromePicker
              color={color}
              disableAlpha={true} 
              onChange={handleColorChange} 
            />
            &nbsp;
            <IonButtons>
              <IonButton onClick={handleRandomize}>
                RANDOMIZE
              </IonButton>
            </IonButtons>
          </div>
          <IonButtons>
            <IonButton onClick={handleSubmit}>
              REGISTER
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

export default RegisterModal;