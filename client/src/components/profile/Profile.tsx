import { IonCard, IonCardContent, IonCardHeader } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { OFF_WHITE, TAB_HEIGHT } from "../../constants";
import { AppContext } from "../app/AppProvider";


const Profile = () => {
  const { profile, isDarkMode } = useContext(AppContext);
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    if (!profile?.color) return;
    setColor(profile.color);
  }, [profile?.color]);

  const handleColorChange = (color: any) => {
    setColor(color.hex);
  }

  const handleColorChangeComplete = (color: any) => {
    setColor(color.hex);
  }
  
  return (
    <IonCard style={{
      backgroundColor: isDarkMode
        ? 'black'
        : OFF_WHITE,
      margin: 0,
      borderRadius: 0,
      height: '100%',
    }}>
      <IonCardHeader style={{
        height: TAB_HEIGHT,
      }}>
        PROFILE
      </IonCardHeader>
      <IonCardContent style={{
        height: `calc(100% - ${TAB_HEIGHT}px)`,
        overflowY: 'scroll',
        padding: 0,
      }}>
        <IonCard style={{
          marginTop: 0,
        }}>
          <IonCardHeader style={{
            fontWeight: 'bold',
          }}>
            Name
          </IonCardHeader> 
          <IonCardContent >
            { profile?.name }
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader style={{
            fontWeight: 'bold',
          }}>
            Color
          </IonCardHeader>
          <IonCardContent>
            <ChromePicker
              color={color}
              disableAlpha={true}
              onChange={handleColorChange}
              onChangeComplete={handleColorChangeComplete}
            />
          </IonCardContent>
        </IonCard>
      </IonCardContent>
    </IonCard>
  );
}

export default Profile;